module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
            firstName: 'customer',
            lastName: 'customer',
            displayName: 'customer',
            password: '$2b$05$23g1QvtuRiASw.1bjbzMpeTQTzxxLgcnaWkjCsqKyGcGkqkjoA0MS',
            email: 'customer@gmail.com',
            avatar: 'anon.png',
            role: 'customer',
            balance: '0',
        },
        {
            firstName: 'creator',
            lastName: 'creator',
            displayName: 'creator',
            password: '$2b$05$23g1QvtuRiASw.1bjbzMpeTQTzxxLgcnaWkjCsqKyGcGkqkjoA0MS',
            email: 'creator@gmail.com',
            avatar: 'anon.png',
            role: 'creator',
            balance: '0',
        },
        {
            firstName: 'moderator',
            lastName: 'moderator',
            displayName: 'moderator',
            password: '$2b$05$23g1QvtuRiASw.1bjbzMpeTQTzxxLgcnaWkjCsqKyGcGkqkjoA0MS',
            email: 'moderator@gmail.com',
            avatar: 'anon.png',
            role: 'moderator',
            balance: '999999999999',
        },
      ], {});
    },
  };