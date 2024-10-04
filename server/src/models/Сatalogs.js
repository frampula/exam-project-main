module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Catalogs', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chats: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Catalogs',
  })}
