const { Review, Restaurant, User } = require('../models');

exports.createReview = async (req, res, next) => {
  try {
    console.log(req.body);
    const newReview = await Review.create({
      detail: req.body.detail,
      restaurantId: req.params.restaurantId,
      userId: req.user.id,
    });
    const review = await Review.findOne({
      where: {
        userId: req.user.id,
      },
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
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
      include: [{ model: User }],
    });
    res.status(200).json({ review });
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  console.log('--------------------_>');

  try {
    const review = await Review.update(
      {
        detail: req.body.detail,
      },
      { where: { id: req.params.reviewId, userId: req.user.id } },
    );
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
