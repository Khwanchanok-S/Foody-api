module.exports = (sequelize, DataTypes) => {
  const Reserve = sequelize.define(
    'Reserve',
    {
      Date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-30]{10}$/,
        },
      },
      Time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-24]{10}$/,
        },
      },
    },
    { underscored: true },
  );
  Reserve.associate = db => {
    Reserve.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Reserve.belongsTo(db.Restaurant, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return Reserve;
};
