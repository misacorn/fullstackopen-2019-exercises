import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Users = ({ user }) => (
  <>
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  </>
);

Users.propTypes = {
  user: propTypes.object.isRequired
};

export default Users;
