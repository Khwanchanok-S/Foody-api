module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        valisate: {
          notEmpty: true,
        },
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mobile: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      information: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: DataTypes.STRING,
    },
    {
      underscored: true,
    },
  );
  Restaurant.associate = db => {
    Restaurant.hasMany(db.Review, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Restaurant.hasMany(db.Reserve, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Restaurant.hasMany(db.Image, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Restaurant.belongsTo(db.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Restaurant;
};
