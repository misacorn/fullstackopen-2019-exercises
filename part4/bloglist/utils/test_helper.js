const Blog = require("../models/blog");
const User = require("../models/user");

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
  },
  {
    title: "Learn Basics of React.js in 11 Minutes",
    author: "Madhu Pathy",
    url:
      "https://medium.com/@madhupathy/learn-basics-of-react-js-in-3-minutes-a94cbc6f02c8",
    id: "5d83c8baf9a2a1f7fd670248"
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb
};
