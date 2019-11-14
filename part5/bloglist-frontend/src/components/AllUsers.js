import React from "react";
import styled from "styled-components";

const TableStyle = styled.div`
  th,
  td {
    padding-right: 25px;
  }
`;

const AllUsers = () => (
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
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
          <tr>
            <td>Cell 3</td>
            <td>Cell 4</td>
          </tr>
        </tbody>
      </table>
    </TableStyle>
  </>
);
export default AllUsers;
