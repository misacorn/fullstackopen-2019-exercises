import React from "react";
import { Table } from "semantic-ui-react";
import propTypes from "prop-types";

import Users from "./Users";

const AllUsers = ({ allUsers }) => {
  const showUser = () =>
    allUsers.map(user => <Users key={user.username} user={user} />);
  return (
    <>
      <h2>Users</h2>
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Names</Table.HeaderCell>
            <Table.HeaderCell>Blogs Created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {allUsers ? showUser() : null}
      </Table>
    </>
  );
};

AllUsers.propTypes = {
  allUsers: propTypes.array.isRequired
};

export default AllUsers;
