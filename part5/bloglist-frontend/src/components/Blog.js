import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { addNewComment } from "../reducers/blogReducer";

const Blog = ({ id, blogs, increaseLikes, removeBlog, addNewComment }) => {
  const [commentInput, setCommentInput] = React.useState();

  const blogDetails = blogs.find(blog => blog.id === id);

  const showComments = () =>
    blogDetails.comments.map(c => <li key={c}>{c}</li>);
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
          <form
            onSubmit={e => {
              e.preventDefault();
              if (commentInput) {
                addNewComment(blogDetails, commentInput);
              }
              setCommentInput("");
            }}
          >
            <input
              name="Add new comment"
              value={commentInput}
              onChange={({ target: { value } }) => setCommentInput(value)}
            />
            <button type="submit">Add</button>
          </form>
          <ul>{showComments()}</ul>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = {
  addNewComment
};

Blog.propTypes = {
  blogs: propTypes.array.isRequired,
  id: propTypes.string.isRequired,
  increaseLikes: propTypes.func.isRequired,
  removeBlog: propTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Blog);
