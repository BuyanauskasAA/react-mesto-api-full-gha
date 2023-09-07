const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./utils/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/cors-handler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected');
  });

const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsHandler);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
