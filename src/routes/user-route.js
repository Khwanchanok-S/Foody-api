const express = require('express');
const userController = require('../controllers/user-controller');
const upload = require('../middlewares/upload');

const router = express.Router();
router.get('/:userId', userController.getUserInfoById);
router.patch(
  '/profile',
  upload.single('profileImage'),
  userController.editUserProfile,
);
module.exports = router;
