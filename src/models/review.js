module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      detail: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      score: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { underscored: true },
  );
  Review.associate = db => {
    Review.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Review.belongsTo(db.Restaurant, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Review;
};
