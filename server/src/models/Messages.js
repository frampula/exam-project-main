module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Messages',
    {
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
        references: {
          model: 'Сonversations',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Messages',
      timestamps: true,
    }
  );
};