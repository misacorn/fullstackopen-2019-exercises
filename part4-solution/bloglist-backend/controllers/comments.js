const router = require("express").Router();
const Blog = require("../models/blog");

router.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments.concat(comment);
  await blog.save();

  response.status(201).json(comment);
});
