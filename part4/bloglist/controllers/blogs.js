const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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
  // try {
  //   const blog = await new Blog(req.body);
  //   if (blog.likes === undefined) {
  //     blog.likes = 0;
  //   }
  //   if (blog.url && blog.title) {
  //     blog.save().then(result => {
  //       res.status(201).json(result);
  //     });
  //   } else {
  //     res.status(400).end();
  //   }
  // } catch (exception) {
  //   next(exception);
  // }
  try {
    const body = req.body;

    const user = await User.findById(body.userId);

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    };

    const savedNote = await blog.save();
    user.blogs = user.blogs.concat(savedNote._id);
    await user.save();
    res.json(savedNote.toJSON());
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

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url
    };
    const blogtoUpdate = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    });
    if (blogtoUpdate) {
      blogtoUpdate.save().then(result => {
        res.status(200).json(result);
      });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
