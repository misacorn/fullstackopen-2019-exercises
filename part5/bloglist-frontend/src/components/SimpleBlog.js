import React from "react";
import propTypes from "prop-types";

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

SimpleBlog.propTypes = {
  blog: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired
};

export default SimpleBlog;
