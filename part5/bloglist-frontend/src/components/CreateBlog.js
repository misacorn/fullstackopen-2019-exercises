import React from "react";
import propTypes from "prop-types";

const CreateBlog = ({ handleSubmit, title, author, url, likes }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          type={title.type}
          value={title.value}
          onChange={title.onChange}
        />
      </div>
      <div>
        Author:
        <input
          type={author.type}
          value={author.value}
          onChange={author.onChange}
        />
      </div>
      <div>
        Url:
        <input type={url.type} value={url.value} onChange={url.onChange} />
      </div>
      <div>
        Likes:
        <input
          type={likes.type}
          value={likes.value}
          onChange={likes.onChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

CreateBlog.propTypes = {
  // handleSubmit: propTypes.func.isRequired,
  title: propTypes.object.isRequired,
  author: propTypes.object.isRequired,
  url: propTypes.object.isRequired,
  likes: propTypes.object.isRequired
};

export default CreateBlog;
