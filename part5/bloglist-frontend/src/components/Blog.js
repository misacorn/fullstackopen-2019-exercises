import React from "react";
import propTypes from "prop-types";

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div className="blog" style={blogStyle}>
      {/* <div>{blog.author}</div> */}
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={increaseLikes}>like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      <button onClick={removeBlog}>remove</button>
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  // increaseLikes: propTypes.func.isRequired,
  // removeBlog: propTypes.func.isRequired
};

export default Blog;
