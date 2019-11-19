import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { Table } from "semantic-ui-react";

const Users = ({ user }) => (
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </Table.Cell>
      <Table.Cell>{user.blogs.length}</Table.Cell>
    </Table.Row>
  </Table.Body>
);

Users.propTypes = {
  user: propTypes.object.isRequired
};

export default Users;
