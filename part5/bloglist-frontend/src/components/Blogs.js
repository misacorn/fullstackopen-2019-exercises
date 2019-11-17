import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Blogs = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
    </div>
  );
};

Blogs.propTypes = {
  blog: propTypes.object.isRequired
};

export default Blogs;
