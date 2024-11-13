const { Messages } = require('../models');
const { Op } = require('sequelize');

const findTextCount = async (data) => {
  try {
    const result = await Messages.count({
      where: {
        body: {
          [Op.iLike]: `%${data}%`
        }
      }
    });
    return result || 0;
  } catch (error) {
    console.error('Ошибка при подсчете сообщений:', error);
    throw error;
  }
};

module.exports = findTextCount;
