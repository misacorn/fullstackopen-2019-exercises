import React from "react";

const CreateBlog = ({
  handleSubmit,
  title,
  author,
  url,
  likes,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleLikesChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input value={title} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        Url:
        <input value={url} onChange={handleUrlChange} />
      </div>
      <div>
        Likes:
        <input value={likes} onChange={handleLikesChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlog;
