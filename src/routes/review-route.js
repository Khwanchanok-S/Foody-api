const express = require('express');
const reviewController = require('../controllers/review-controller');
const { route } = require('./auth-route');
const router = express.Router();

router.post('/:restaurantId', reviewController.createReview);
router.get('/:restaurantId', reviewController.getAllReview);
module.exports = router;
