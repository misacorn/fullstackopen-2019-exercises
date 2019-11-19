import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { addNewComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notiReducer";

const uniqid = require("uniqid");

const Blog = ({
  id,
  blogs,
  increaseLikes,
  removeBlog,
  addNewComment,
  setNotification
}) => {
  const blogDetails = blogs.find(blog => blog.id === id);

  const handleSubmit = e => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = "";
    addNewComment(blogDetails, comment);
    setNotification("Added a new comment", 3000);
  };

  const showComments = () =>
    blogDetails.comments.map(c => <li key={uniqid()}>{c}</li>);
  return (
    <>
      {blogDetails && (
        <>
          <h2>
            {blogDetails.title} - {blogDetails.author}
          </h2>
          <div>{blogDetails.url}</div>
          <div>
            {blogDetails.likes} likes
            <button onClick={() => increaseLikes(blogDetails)}>like</button>
          </div>
          <div>Added by {blogDetails.user.name}</div>
          <button onClick={() => removeBlog(blogDetails)}>remove</button>
          <h3>Comments</h3>
          <form onSubmit={handleSubmit}>
            <input name="comment" />
            <button type="submit">Add</button>
          </form>
          <ul>{showComments()}</ul>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    noti: state.notiReducer
  };
};

const mapDispatchToProps = {
  addNewComment,
  setNotification
};

Blog.propTypes = {
  blogs: propTypes.array.isRequired,
  id: propTypes.string.isRequired,
  increaseLikes: propTypes.func.isRequired,
  removeBlog: propTypes.func.isRequired,
  addNewComment: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
