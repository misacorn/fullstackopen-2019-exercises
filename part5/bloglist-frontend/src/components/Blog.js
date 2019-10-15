import React from "react";
const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div style={blogStyle}>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button>like</button>
      </div>
      <div>Added by {user.name}</div>
    </div>
  );
};

export default Blog;
