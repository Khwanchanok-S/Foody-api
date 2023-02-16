const { Review, Restaurant } = require('../models');

exports.createReview = async (req, res, next) => {
  try {
    console.log(req.body);
    const review = await Review.create({
      detail: req.body.detail,
      restaurantId: req.params.restaurantId,
      userId: req.user.id,
    });
    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};

exports.getAllReview = async (req, res, next) => {
  try {
    const review = await Review.findAll({
      where: {
        restaurantId: req.params.restaurantId,
      },
      include: [{ model: Restaurant }],
    });
    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.destroy({
      where: {
        id: req.params.reviewId,

        userId: req.user.id,
      },
    });
    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};
