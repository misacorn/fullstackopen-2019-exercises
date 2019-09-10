const listHelper = require("../utils/list_helper");

describe("most likes", () => {
  const allBlogs = [
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
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      id: "5d760883fc16f820ee57338b"
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      id: "5d76089ffc16f820ee57338c"
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      id: "5d7608b0fc16f820ee57338d"
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      id: "5d7608befc16f820ee57338e"
    }
  ];
  test("which author has most likes", () => {
    const result = listHelper.mostLikes(allBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});
