const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  obj.status = CONSTANTS.OFFER_STATUS_ON_MODERATION;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId,
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
  CONSTANTS.CONTEST_STATUS_FINISHED
}'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
  CONSTANTS.CONTEST_STATUS_ACTIVE
}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId,
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId,
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getOffers = async (req, res, next) => {
  const { awardSort, where, limit, offset } = req.query;

  const predicates = UtilFunctions.createWhereForAllOffers(awardSort, where);
  
  try {
    const totalCount = await db.Offers.count({
      where: predicates.where
    });

    const offers = await db.Offers.findAll({
      where: predicates.where,
      order: predicates.order,
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0,
      include: [
        {
          model: db.Contests,
        },
      ],
    });

    const currentOffset = parseInt(offset) || 0;
    const currentLimit = parseInt(limit) || 10;
    const haveMore = totalCount > (currentOffset + currentLimit);

    res.send({ 
      offers,
      haveMore
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.rejectOfferByModerator = async (req, res, next) => {
  try {
    const { offerId, creatorId, contestId } = req.body;

    const rejectedOffer = await contestQueries.updateOffer(
      { status: CONSTANTS.OFFER_STATUS_REJECTED_BY_MODERATOR },
      { id: offerId },
    );
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        creatorId,
        'Someone of yours offers was rejected by moderator',
        contestId,
      );

    res.send(rejectedOffer);
  } catch (err) {
    next(err);
  }
};

module.exports.approveOfferByModerator = async (req, res, next) => {
  try {
    const { offerId, creatorId, contestId } = req.body;

    const approvedOffer = await contestQueries.updateOffer(
      { status: CONSTANTS.OFFER_STATUS_PENDING },
      { id: offerId },
    );
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        creatorId,
        'Someone of yours offers was approved by moderator',
        contestId,
      );

    res.send(approvedOffer);
  } catch (err) {
    next(err);
  }
};
