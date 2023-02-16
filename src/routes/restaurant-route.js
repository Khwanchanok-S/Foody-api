const express = require('express');
const restaurantController = require('../controllers/restaurant-controller');
const upload = require('../middlewares/upload');
const { route } = require('./auth-route');
const router = express.Router();

router.post(
  '/:categoryId',
  upload.single('profileImage'),
  restaurantController.createRestaurant,
);
router.get('/:restaurantId', restaurantController.getRestaurantById);
router.get('/:categoryId', restaurantController.getAllRestaurants);

module.exports = router;
