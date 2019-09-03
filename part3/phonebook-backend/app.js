const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const personsRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
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
