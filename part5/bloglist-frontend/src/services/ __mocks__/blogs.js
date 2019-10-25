const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 11,
    user: {
      username: "111",
      name: "111",
      id: "5d9f91a87d342223de435940"
    },
    id: "5d9f92ad7d342223de435943"
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 6,
    user: {
      username: "111",
      name: "111",
      id: "5d9f91a87d342223de435940"
    },
    id: "5d9f93477d342223de435944"
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: {
      username: "222",
      name: "222",
      id: "5d9f91b97d342223de435941"
    },
    id: "5d9f93b97d342223de435946"
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: {
      username: "111",
      name: "111",
      id: "5d9f91a87d342223de435940"
    },
    id: "5da2147519a5af2af25f7a5c"
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 4,
    user: {
      username: "222",
      name: "222",
      id: "5d9f91b97d342223de435941"
    },
    id: "5da217ba672b5041c4c64181"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };
