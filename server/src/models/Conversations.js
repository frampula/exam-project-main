module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Conversations', {
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
  },
  {
    sequelize,
    modelName: 'Conversations',
    timestamps: true, 
  }
);
}