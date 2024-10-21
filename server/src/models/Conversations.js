module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define('Conversations', {
    participants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    blackList: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
    },
    favoriteList: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
    },
  });

  Conversations.associate = function(models) {
    Conversations.hasMany(models.Messages, { foreignKey: 'conversationId' });
  };

  return Conversations;
};