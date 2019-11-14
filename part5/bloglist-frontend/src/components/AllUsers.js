import React from "react";
import styled from "styled-components";

import Users from "./Users";

const TableStyle = styled.div`
  th,
  td {
    padding-right: 25px;
  }
`;

const AllUsers = ({ allUsers }) => {
  const showUser = () =>
    allUsers.map(user => <Users key={user.username} user={user} />);
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
          <tbody>{allUsers ? showUser() : null}</tbody>
        </table>
      </TableStyle>
    </>
  );
};

export default AllUsers;
