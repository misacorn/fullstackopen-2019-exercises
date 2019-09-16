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

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("amount of blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body.length).toBe(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
