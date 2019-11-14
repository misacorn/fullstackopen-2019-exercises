import React from "react";
import { Link } from "react-router-dom";

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

export default Users;
