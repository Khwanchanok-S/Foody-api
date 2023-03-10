module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        valisate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    },
  );
  Image.associate = db => {
    Image.belongsTo(db.Restaurant, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return Image;
};
