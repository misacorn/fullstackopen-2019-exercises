import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { List } from "semantic-ui-react";

const Blogs = ({ blog }) => (
  <List celled>
    <List.Item>
      <List.Content>
        <List.Header>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </List.Header>
      </List.Content>
    </List.Item>
  </List>
);

Blogs.propTypes = {
  blog: propTypes.object.isRequired
};

export default Blogs;
