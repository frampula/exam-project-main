const { Messages } = require('../models');
const { Op } = require('sequelize');
const Message = require('../models/mongoModels/Message');


async function findTextCount(searchWord) {
    try {
      const searchRegex = new RegExp(searchWord, 'i');
      const exactMatchRegex = new RegExp(`${searchWord}$`, 'i');

      const result = await Message.aggregate([
        {
          $match: {
            body: { $regex: searchRegex }
          }
        },
        {
          $project: {
            words: {
              $split: ["$body", " "]
            }
          }
        },
        { $unwind: "$words" },
        {
          $match: {
            words: { $regex: exactMatchRegex }
          }
        },
        {
          $count: "total"
        }
      ]);

      return result.length > 0 ? result[0].total : 0;
    } catch (error) {
      console.error('Помилка при підрахунку слова:', error);
      throw error;
    }
}

module.exports = findTextCount


