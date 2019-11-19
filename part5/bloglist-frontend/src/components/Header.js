import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import propTypes from "prop-types";

const PaddingRight = styled.div`
  padding-right: 15px;
`;

const Header = ({ user, logout }) => (
  <Menu>
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>

    <Menu.Item>
      <Link to="/users">Users</Link>
    </Menu.Item>

    <Menu.Item>
      <PaddingRight>{user.name} logged in</PaddingRight>
      <Button onClick={logout}>logout</Button>
    </Menu.Item>
  </Menu>
);

Header.propTypes = {
  user: propTypes.object.isRequired,
  logout: propTypes.func.isRequired
};

export default Header;
