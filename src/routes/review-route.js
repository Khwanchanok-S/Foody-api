const express = require('express');
const reviewController = require('../controllers/review-controller');
const router = express.Router();

router.post('/:restaurantId', reviewController.createReview);
router.get('/:restaurantId', reviewController.getAllReview);
router.delete('/:reviewId', reviewController.deleteReview);
router.patch('/:reviewId', reviewController.updateReview);
module.exports = router;
