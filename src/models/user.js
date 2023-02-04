module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        valisate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: DataTypes.STRING,
    },
    {
      underscored: true,
    },
  );

  User.associate = db => {
    User.hasMany(db.Review, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    User.hasMany(db.Reserve, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return User;
};
