import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
  <div className="simpleBlog">
    {/* <div> */}
    <div>
      {blog.title} {blog.author}
    </div>
    <li>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </li>
  </div>
);

export default SimpleBlog;
