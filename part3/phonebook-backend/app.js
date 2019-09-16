const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const personsRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message);
  });

morgan.token('post', function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post')
);

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/persons', personsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
