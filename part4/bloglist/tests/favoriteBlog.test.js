const listHelper = require("../utils/list_helper");

describe("most likes", () => {
  const listWithThreeBlogs = [
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
    }
  ];
  test("which blog has most likes", () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      id: "5d760883fc16f820ee57338b",
      likes: 12,
      title: "Canonical string reduction",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    });
  });
});
