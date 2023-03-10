const { Restaurant, Image, Category } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.createRestaurant = async (req, res, next) => {
  let urlArr = [];
  try {
    const restaurant = await Restaurant.create({
      Name: req.body.name,
      Location: req.body.location,
      mobile: req.body.mobile,
      information: req.body.information,
      // profileImage: ,
      categoryId: req.params.categoryId,
    });
    if (req.files.length > 0) {
      // const url = await cloudinary.upload(req.files.path);
      // req.files.forEach(async (el, i) => {
      //   urlArr[i] = await cloudinary.upload(el.path);
      // });

      for (let el of req.files) {
        let url = await cloudinary.upload(el.path);
        urlArr.push({
          url: url,
          restaurantId: restaurant.id,
        });
      }
      console.log(urlArr);
      // console.log(restaurant.id);
      await Image.bulkCreate(urlArr);
      await Restaurant.update(
        { profileImage: urlArr[0].url },
        { where: { id: restaurant.id } },
      );
    }

    console.log(req.body);
    // res.status(201).json({ restaurant });
    res.send('ok');
  } catch (err) {
    next(err);
  }
};
exports.getRestaurantById = async (req, res, next) => {
  const { restaurantId } = req.params;
  console.log('---------------> ', restaurantId);
  try {
    const restaurant = await Restaurant.findOne({
      where: {
        id: +restaurantId,
      },
      include: {
        model: Image,
      },
    });
    console.log('>>>>>>>>>>>>>> ', restaurant);
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
