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
  return blogs.length === 0 ? 0 : Math.max(...blogs.map(blog => blog.likes));
  // const max = blogs.reduce((prev, current) =>
  //   prev.likes > current.likes ? prev : current
  // );
  // return blogs.length === 0 ? 0 : max;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
