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

describe("adding a new blog", () => {
  test("if blog likes are missing", async () => {
    const newBlog = {
      title: "Learn Basics of React.js in 11 Minutes",
      author: "Madhu Pathy",
      url:
        "https://medium.com/@madhupathy/learn-basics-of-react-js-in-3-minutes-a94cbc6f02c8"
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    const author = res.body.map(r => r.author);
    const likes = res.body.map(r => r.likes);
    expect(res.body.length).toBe(helper.initialBlogs.length + 1);
    expect(author).toContain("Madhu Pathy");
    expect(likes).toContain(0);
  });

  // test("if title and url are missing", async () => {
  //   const newBlog = {
  //     author: "Madhu Pathy",
  //     likes: 15
  //   };
  //   await api
  //     .post("/api/blogs")
  //     .send(newBlog)
  //     .expect(400);
  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
  // });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(resultBlog.body).toEqual(blogToView);
  });

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    // console.log(validNonexistingId);
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

// describe("deleting of a blog", () => {
//   test("succeeds with status code 204 if id is valid", async () => {
//     const blogsAtStart = await helper.blogsInDb();
//     const blogToDelete = blogsAtStart[0];

//     await api.delete(`/api/notes/${blogToDelete.id}`).expect(204);
//     const blogsAtEnd = await helper.notesInDb();
//     expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

//     const contents = blogsAtEnd.map(r => r.content);
//     expect(contents).not.toContain(blogToDelete.content);
//   });
// });

afterAll(() => {
  mongoose.connection.close();
});
