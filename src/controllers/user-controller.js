const { User } = require('../models');
const createError = require('../utils/create-error');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.getUserInfoById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      createError('user with this id is not found', 400);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.editUserProfile = async (req, res, next) => {
  console.log('--------------------_>', req.body);

  try {
    let profileImageUrl;
    if (req.file) {
      profileImageUrl = await cloudinary.upload(req.file.path);
    }
    const { profileImage, firstName, lastName } = req.body;
    const value = { profileImage: profileImageUrl, firstName, lastName };
    const updateUser = await User.update(value, {
      where: { id: req.user.id },
    });
    // const user = await User.update(
    //   {
    //     firstname: req.body.firstName,
    //     lastname: req.body.lastName,
    //     profileImage: req.body.profileImage,
    //   },
    //   { where: { id: req.user.id } },
    // );
    res.status(200).json({ value });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
