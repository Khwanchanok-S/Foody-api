const fs = require('fs');

const { Restaurant, Category } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.createRestaurant = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(404).json({ message: 'Unauthenticated' });
    }
    let restaurantImageUrl;
    if (req.file) {
      restaurantImageUrl = await cloudinary.upload(req.file.path);
    }
    const restaurant = await Restaurant.create({
      name: req.body.name,
      location: req.body.location,
      profileImage: restaurantImageUrl,
      mobile: req.body.mobile,
      information: req.body.information,
      categoryId: req.body.categoryId,
    });
    const createRestaurant = await Restaurant.findOne({
      include: [{ model: Category }],
    });

    res.status(201).json({ createRestaurant });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

// exports.createRestaurant = async (req, res, next) => {
//   console.log('------------__>api');
//   console.log(req.files);
//   let urlArr = [];
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthrorized' });
//     }

//     const restaurant = await Restaurant.create({
//       Name: req.body.name,
//       Location: req.body.location,
//       mobile: req.body.mobile,
//       information: req.body.information,
//       categoryId: req.params.categoryId,
//     });
//     console.log('---------------> after create');

//     for (let el of req.files) {
//       let url = await cloudinary.upload(el.path);
//       urlArr.push({
//         url: url,
//         restaurantId: restaurant.id,
//       });
//     }

//     console.log(urlArr);
//     await Image.bulkCreate(urlArr);
//     await Restaurant.update(
//       { profileImage: urlArr[0].url },
//       { where: { id: restaurant.id } },
//     );

//     res.status(201).json({ restaurant });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.createRestaurant = async (req, res, next) => {
//   console.log('------------__>api');
//   console.log(req.files);
//   let urlArr = [];
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthrorized' });
//     }

//     const restaurant = await Restaurant.create({
//       Name: req.body.name,
//       Location: req.body.location,
//       mobile: req.body.mobile,
//       information: req.body.information,
//       categoryId: req.params.categoryId,
//     });
//     console.log('---------------> after create');

//     for (let el of req.files) {
//       let url = await cloudinary.upload(el.path);
//       urlArr.push({
//         url: url,
//         restaurantId: restaurant.id,
//       });
//     }

//     console.log(urlArr);
//     await Image.bulkCreate(urlArr);
//     await Restaurant.update(
//       // { profileImage: urlArr[0].url },
//       { Image: urlArr[0].url },
//       { where: { id: restaurant.id } },
//     );

//     res.status(201).json({ restaurant });
//   } catch (err) {
//     next(err);
//   }
// };

// } catch (err) {
//   next(err);
// }
//   try {
//     const input = JSON.parse(req.body.input);
//     const photos = req.files;
//     // const restaurantData = await Restaurant.create(input);
//     const restaurant = await Restaurant.create({
//       Name: req.body.name,
//       Location: req.body.location,
//       mobile: req.body.mobile,
//       information: req.body.information,
//       categoryId: req.params.categoryId,
//     });
//     const newRestaurant = JSON.parse(JSON.stringify(restaurant));

//     for (let i in photos) {
//       console.log(typeof i);
//       const photo = await cloudinary.upload(photos[i].path);
//       const imageInput = {
//         isMain: +i === 0,
//         productId: newRestaurant.id,
//         link: photo,
//       };
//       await Image.create(imageInput);
//       fs.unlinkSync(req.files[i].path);
//       await Image.bulkCreate(urlArr);
//       await Restaurant.update(
//         { image: urlArr[0].url },
//         { where: { id: restaurant.id } },
//       );
//     }
//     res.status(201).json({ message: 'create restaurant success' });
//   } catch (err) {
//     next(err);
//   }

exports.updateRestaurant = async (req, res, next) => {
  console.log('safasdfsadfasfasfasdfasdfsafsadfasdf');
  try {
    let updateRestaurantCoverUrl;

    if (req.file) {
      updateRestaurantCoverUrl = await cloudinary.upload(req.file?.path);
    }
    console.log('wwwwwwwwwwwwwwwwww');
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    const restaurant = await Restaurant.update(
      {
        name: req.body.name,
        location: req.body.location,
        mobile: req.body.mobile,
        information: req.body.information,
        categoryId: req.body.categoryId,
      },
      { where: { id: req.params.restaurantId } },
    );
    res.status(200).json({ restaurant });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getRestaurantById = async (req, res, next) => {
  // const { restaurantId } = req.params;

  try {
    const restaurant = await Restaurant.findOne({
      where: {
        id: req.params.restaurantId,
      },
      include: [
        {
          model: Category,
        },
      ],
    });

    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findAll({
      include: { model: Category },
    });
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};
exports.deleteRestaurants = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Restaurant.destroy({
      where: {
        id: req.params.restaurantId,
      },
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
