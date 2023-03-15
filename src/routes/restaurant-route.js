const express = require('express');
const restaurantController = require('../controllers/restaurant-controller');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/:restaurantId', restaurantController.getRestaurantById);
router.delete('/:restaurantId', restaurantController.deleteRestaurants);
router.get('/:categoryId', restaurantController.getAllRestaurants);
router.get('/', restaurantController.getAllRestaurants);
router.post(
  '/addRestaurant/',
  upload.single('profileImage'),
  restaurantController.createRestaurant,
);
router.patch(
  '/editRestaurant/:restaurantId',
  upload.single('profileImage'),
  restaurantController.updateRestaurant,
);

// router.post(
//   '/',
//   upload.array('profileImage', 4),
//   restaurantController.createRestaurant,
// );
// router.post(
//   '/addRestaurant',
//   upload.array('photos', 4),
//   restaurantController.createRestaurant,
// );

module.exports = router;
