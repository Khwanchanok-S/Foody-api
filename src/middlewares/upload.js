const chalk = require('chalk');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    console.log(req);
    console.log(chalk.cyan('====================='));
    console.log(file);
    console.log(chalk.magenta('**********************'));
    cb(
      null,
      new Date().getTime() +
        ' ' +
        Math.round(Math.random() * 100000000) +
        '.' +
        file.mimetype.split('/')[1],
    );
  },
});
module.exports = multer({ storage });
