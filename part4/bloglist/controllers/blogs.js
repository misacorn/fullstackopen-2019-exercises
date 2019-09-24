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

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    Blog.findById(req.params.id).then(blog =>
      blog.id  ? res.json(blog.toJSON()) : res.status(404).end
    );
  } catch (exception) {
    next(exception);
  }
});

// personsRouter.get('/:id', (req, res, next) => {
//   Person.findById(req.params.id)
//     .then(person => {
//       person ? res.json(person.toJSON()) : res.status(404).end();
//     })
//     .catch(error => next(error));
// });

blogsRouter.post("/", async (req, res, next) => {
  try {
    const blog = await new Blog(req.body);
    if (blog.url === undefined || blog.title === undefined) {
      return res.status(400).end();
    }
    if (blog.likes === undefined) {
      blog.likes = 0;
    }
    blog.save().then(result => {
      res.status(201).json(result);
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
