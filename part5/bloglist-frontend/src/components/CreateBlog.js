import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { updateForm, resetForm } from "../reducers/blogFormReducer";

const CreateBlog = ({ handleSubmit, blogForm, updateForm }) => {
  const { title, author, url, likes } = blogForm;

  const onChange = event => {
    updateForm(event.target.name, event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input name="title" value={title} onChange={onChange} />
      </div>
      <div>
        Author:
        <input name="author" value={author} onChange={onChange} />
      </div>
      <div>
        Url:
        <input name="url" value={url} onChange={onChange} />
      </div>
      <div>
        Likes:
        <input name="likes" value={likes} onChange={onChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    blogForm: state.blogForm
  };
};

const mapDispatchToProps = {
  updateForm,
  resetForm
};

CreateBlog.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  blogForm: propTypes.object.isRequired,
  updateForm: propTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBlog);
