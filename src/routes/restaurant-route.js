const express = require('express');
const restaurantController = require('../controllers/restaurant-controller');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post(
  '/:categoryId',
  upload.array('profileImage', 4),
  restaurantController.createRestaurant,
);
router.get('/:restaurantId', restaurantController.getRestaurantById);
router.get('/:categoryId', restaurantController.getAllRestaurants);
router.get('/', restaurantController.getAllRestaurants);
module.exports = router;
