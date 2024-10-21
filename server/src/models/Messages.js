module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Messages.associate = function(models) {
    Messages.belongsTo(models.Conversations, { foreignKey: 'conversationId' });
  };

  return Messages;
};