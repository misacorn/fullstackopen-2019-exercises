const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, like) => {
    return sum + like;
  };
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = blogs => {
  const authorsObj = _.countBy(blogs.map(blog => blog.author));
  const authors = Object.keys(authorsObj);
  const numOfBlog = Object.values(authorsObj);
  const mostNumOfBlog = Math.max(...numOfBlog);
  const foundAuthor = authors[numOfBlog.indexOf(mostNumOfBlog)];
  const foundObj = { author: foundAuthor, blogs: mostNumOfBlog };
  return foundObj;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
