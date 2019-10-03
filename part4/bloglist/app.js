const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

mongoose.set("useCreateIndex", true);

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
