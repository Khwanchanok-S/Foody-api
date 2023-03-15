module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      information: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      profileImage: { type: DataTypes.STRING, allowNull: false },
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
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Restaurant.hasMany(db.Reserve, {
      foreignKey: {
        name: 'restaurantId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    // Restaurant.hasMany(db.Image, {
    //   foreignKey: {
    //     name: 'restaurantId',
    //     allowNull: false,
    //   },
    //   onDelete: 'CASCADE',
    // });

    Restaurant.belongsTo(db.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Restaurant;
};
