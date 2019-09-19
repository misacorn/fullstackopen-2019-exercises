const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../utils/test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test("amount of blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body.length).toBe(helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const res = await api.get("/api/blogs/");
  expect(res.body[0].id).toBeDefined();
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "Learn Basics of React.js in 11 Minutes",
    author: "Madhu Pathy",
    url:
      "https://medium.com/@madhupathy/learn-basics-of-react-js-in-3-minutes-a94cbc6f02c8",
    likes: 15
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");
  const author = res.body.map(r => r.author);
  expect(res.body.length).toBe(helper.initialBlogs.length + 1);
  expect(author).toContain("Madhu Pathy");
});

afterAll(() => {
  mongoose.connection.close();
});
