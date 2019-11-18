import React from "react";
import propTypes from "prop-types";

const Blog = ({ id, blogs, increaseLikes, removeBlog }) => {
  const blogDetails = blogs.find(blog => blog.id === id);
  const showComments = () =>
    blogDetails.comments.map(c => <li key={c}>{c}</li>);
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
          <h4>Comments</h4>
          <ul>{showComments()}</ul>
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
