const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (req, res) => {
  try {
    const blog = await new Blog(req.body);
    blog.save().then(result => {
      res.status(201).json(result);
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
