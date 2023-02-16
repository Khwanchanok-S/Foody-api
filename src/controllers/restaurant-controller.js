const { Restaurant } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.createRestaurant = async (req, res, next) => {
  try {
    const url = await cloudinary.upload(req.file.path);
    console.log(req.body);
    const restaurant = await Restaurant.create({
      Name: req.body.name,
      Location: req.body.location,
      mobile: req.body.mobile,
      information: req.body.information,
      profileImage: url,
      categoryId: req.params.categoryId,
    });
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};
exports.getRestaurantById = async (req, res, next) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurant.findOne({
      where: {
        id: restaurantId,
      },
    });
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findAll({
      include: [{ mobile: Restaurant }],
    });
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};
