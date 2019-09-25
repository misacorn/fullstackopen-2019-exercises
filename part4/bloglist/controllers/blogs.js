const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog ? res.json(blog.toJSON()) : res.status(404).end();
  } catch (exception) {
    res.status(400).json(exception);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  try {
    const blog = await new Blog(req.body);
    if (blog.likes === undefined) {
      blog.likes = 0;
    }
    if (blog.url && blog.title) {
      blog.save().then(result => {
        res.status(201).json(result);
      });
    } else {
      res.status(400).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndRemove(req.params.id);
    if (blog) {
      res.status(204).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
