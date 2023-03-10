require('dotenv').config();

// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route');
const reviewRoute = require('./routes/review-route');
const restaurantRoute = require('./routes/restaurant-route');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const authenticateMiddleware = require('./middlewares/authenticate');

const app = express();

app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: 'too many requests, please try again later' },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/users', authenticateMiddleware, userRoute);
app.use('/reviews', authenticateMiddleware, reviewRoute);
app.use('/restaurants', restaurantRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.yellowBright.bold(`server running on port: ${port}`)),
);
