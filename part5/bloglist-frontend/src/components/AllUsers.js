import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getAllUsers } from "../reducers/allUsersReducer";

const TableStyle = styled.div`
  th,
  td {
    padding-right: 25px;
  }
`;

const AllUsers = ({ allUsers, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const showUser = () =>
    allUsers.map(user => (
      <tr key={user.username}>
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
      </tr>
    ));
  return (
    <>
      <h2>Users</h2>
      <TableStyle>
        <table>
          <thead id="myTHead">
            <tr>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr> */}
            {/* <td>Cell 1</td>
              <td>Cell 2</td> */}
            {allUsers ? showUser() : null}
            {/* </tr> */}
            {/* <tr>
              <td>Cell 3</td>
              <td>Cell 4</td>
            </tr> */}
          </tbody>
        </table>
      </TableStyle>
    </>
  );
};

const mapStateToProps = state => {
  return {
    allUsers: state.allUser
  };
};

const mapDispatchToProps = {
  getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
