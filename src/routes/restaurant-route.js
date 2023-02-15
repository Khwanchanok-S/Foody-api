const express = require('express');
const restaurantController = require('../controllers/restaurant-controller');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post(
  '/restaurant/:categoryId',
  upload.single('profileImage'),
  restaurantController.createRestaurant,
);

module.exports = router;
