import React from "react";
const Blog = ({ blog }) => (
  <>
    {/* <p>{blog.title}</p> */}
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>{blog.likes}</div>
  </>
);

export default Blog;
