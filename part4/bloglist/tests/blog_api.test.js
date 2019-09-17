const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    id: "5d728cb8e0becf1d7b636c10"
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    id: "5d728cd9e0becf1d7b636c11"
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("amount of blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body.length).toBe(initialBlogs.length);
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
  expect(res.body.length).toBe(initialBlogs.length + 1);
  expect(author).toContain("Madhu Pathy");
});

afterAll(() => {
  mongoose.connection.close();
});
