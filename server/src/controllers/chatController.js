const { Catalogs, Messages, Conversations, Users } = require('../models');
const moment = require('moment');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');
const { Op } = require('sequelize');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );

  try {
    const [newConversation] = await Conversations.findOrCreate({
      where: { participants },
      defaults: { blackList: [false, false], favoriteList: [false, false] },
    });
    const message = await Messages.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversationId: newConversation.id,
    });

    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];

    const preview = {
      _id: newConversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createdAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });

    res.send({ message, preview });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.query.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );

  try {
    const messages = await Messages.findAll({
      where: { conversationId: req.query.conversationId },
      include: [{ model: Conversations, where: { participants } }],
      order: [['createdAt', 'ASC']],
    });

    const interlocutor = await userQueries.findUser({
      id: req.query.interlocutorId,
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const messages = await Messages.findAll({
      include: [
        {
          model: Conversations,
          where: {
            participants: {
              [Op.contains]: [req.tokenData.userId],
            },
          },
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const conversationsMap = new Map();
    messages.forEach((message) => {
      const conversationId = message.Conversation.id;
      if (!conversationsMap.has(conversationId)) {
        conversationsMap.set(conversationId, {
          _id: conversationId,
          sender: message.sender,
          text: message.body,
          createdAt: message.createdAt,
          participants: message.Conversation.participants,
          blackList: message.Conversation.blackList,
          favoriteList: message.Conversation.favoriteList,
        });
      }
    });

    const conversations = Array.from(conversationsMap.values());

    const interlocutors = [];
    conversations.forEach((conversation) => {
      const interlocutorId = conversation.participants.find(
        (participant) => participant !== req.tokenData.userId
      );
      if (interlocutorId) {
        interlocutors.push(interlocutorId);
      }
    });

    const senders = await Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    conversations.forEach((conversation) => {
      senders.forEach((sender) => {
        if (conversation.participants.includes(sender.id)) {
          conversation.interlocutor = {
            id: sender.id,
            firstName: sender.firstName,
            lastName: sender.lastName,
            displayName: sender.displayName,
            avatar: sender.avatar,
          };
        }
      });
    });

    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const participantIndex = req.body.participants.indexOf(req.tokenData.userId);
  
  try {
    const chat = await Conversations.findOne({
      where: { participants: req.body.participants },
    });

    if (chat) {
      const newBlackList = [...chat.blackList];
      newBlackList[participantIndex] = req.body.blackListFlag;
      
      await chat.update({
        blackList: newBlackList
      });

      const updatedChat = await chat.reload();
      res.send(updatedChat);

      const interlocutorId = req.body.participants.filter(
        (participant) => participant !== req.tokenData.userId
      )[0];
      
      controller
        .getChatController()
        .emitChangeBlockStatus(interlocutorId, updatedChat);
    } else {
      res.status(404).send({ message: 'Chat not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const participantIndex = req.body.participants.indexOf(req.tokenData.userId);
  
  try {
    const chat = await Conversations.findOne({
      where: { participants: req.body.participants },
    });

    if (chat) {
      const newFavoriteList = [...chat.favoriteList];
      newFavoriteList[participantIndex] = req.body.favoriteFlag;

      await chat.update({
        favoriteList: newFavoriteList
      });
      
      const updatedChat = await chat.reload();
      res.send(updatedChat);
    } else {
      res.status(404).send({ message: 'Chat not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const catalog = await Catalogs.create({
    userId: req.tokenData.userId,
    catalogName: req.body.catalogName,
    chats: [req.body.chatId],
  });

  try {
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalogs.findOne({
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
    });

    if (catalog) {
      catalog.catalogName = req.body.catalogName;
      await catalog.save();
      res.send(catalog);
    } else {
      res.status(404).send({ message: 'Catalog not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  console.log(req.body.catalogId, req.body.chatId);
  try {
    const catalog = await Catalogs.findOne({
      where: { id: req.body.catalogId, userId: req.tokenData.userId },
    });

    if (catalog) {
      await catalog.update({ chats: [...catalog.chats, req.body.chatId] });
      res.send(catalog);
    } else {
      res.status(404).send({ message: 'Catalog not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  console.log(req.query.catalogId);
  try {
    const catalog = await Catalogs.findOne({
      where: { id: req.query.catalogId, userId: req.tokenData.userId },
    });

    if (catalog) {
      catalog.chats = catalog.chats.filter(
        (chatId) => chatId !== +req.query.chatId
      );
      await catalog.save();
      res.send(catalog);
    } else {
      res.status(404).send({ message: 'Catalog not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const result = await Catalogs.destroy({
      where: { id: req.query.catalogId, userId: req.tokenData.userId },
    });

    if (result) {
      res.end();
    } else {
      res.status(404).send({ message: 'Catalog not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalogs.findAll({
      where: { userId: req.tokenData.userId },
      attributes: ['id', 'catalogName', 'chats'],
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
