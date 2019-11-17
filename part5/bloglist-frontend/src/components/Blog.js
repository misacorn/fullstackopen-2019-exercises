import React from "react";
import propTypes from "prop-types";

const Blog = ({ id, blogs, increaseLikes, removeBlog }) => {
  const blogDetails = blogs.find(blog => blog.id === id);
  return (
    <>
      {blogDetails && (
        <>
          <h2>{blogDetails.title}</h2>
          <div>{blogDetails.url}</div>
          <div>
            {blogDetails.likes} likes
            <button onClick={() => increaseLikes(blogDetails)}>like</button>
          </div>
          <div>Added by {blogDetails.user.name}</div>
          <button onClick={() => removeBlog(blogDetails)}>remove</button>
        </>
      )}
    </>
  );
};

Blog.propTypes = {
  blogs: propTypes.array.isRequired,
  id: propTypes.string.isRequired,
  increaseLikes: propTypes.func.isRequired,
  removeBlog: propTypes.func.isRequired
};

export default Blog;
