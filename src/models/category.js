module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'Category',
    {
      Name: {
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
  category.associate = db => {
    category.hasMany(db.Restaurant, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return category;
};
