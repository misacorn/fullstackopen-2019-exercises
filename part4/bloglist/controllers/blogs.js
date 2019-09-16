const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = await new Blog(req.body);
  blog.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
