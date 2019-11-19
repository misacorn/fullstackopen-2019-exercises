import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaddingRight = styled.div`
  padding-right: 15px;
`;

const Header = ({ user, logout }) => {
  const [activeItem, setActiveItem] = useState("");
  // const handleItemClick = (e, { name }) => setActiveItem({ name });
  return (
    <Menu>
      <Menu.Item
      // name="editorials"
      // active={activeItem === "editorials"}
      // content="Editorials"
      // onClick={handleItemClick}
      >
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item
        name="reviews"
        active={activeItem === "reviews"}
        // onClick={handleItemClick}
      >
        <Link to="/users">Users</Link>
      </Menu.Item>

      <Menu.Item
        name="upcomingEvents"
        active={activeItem === "upcomingEvents"}
        // onClick={handleItemClick}
      >
        <PaddingRight>{user.name} logged in</PaddingRight>
        <Button onClick={logout}>logout</Button>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
