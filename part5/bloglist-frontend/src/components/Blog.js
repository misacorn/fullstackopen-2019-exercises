import React from "react";
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

export default Blog;
