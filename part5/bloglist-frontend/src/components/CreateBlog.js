import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

import { updateForm, resetForm } from "../reducers/blogFormReducer";

const Padding = styled.div`
  padding: 15px 0;
`;

const CreateBlog = ({ handleSubmit, blogForm, updateForm }) => {
  const { title, author, url, likes } = blogForm;

  const onChange = event => {
    updateForm(event.target.name, event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <Input name="title" value={title} onChange={onChange} />
      </div>
      <div>
        Author:
        <Input name="author" value={author} onChange={onChange} />
      </div>
      <div>
        Url:
        <Input name="url" value={url} onChange={onChange} />
      </div>
      <div>
        Likes:
        <Input name="likes" value={likes} onChange={onChange} />
      </div>
      <Padding>
        <Button type="submit">create</Button>
      </Padding>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
