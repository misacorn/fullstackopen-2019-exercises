import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AllUsers from "./AllUsers";

const Menu = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <Router>
      <>
        <>
          <Link style={padding} to="/">
            Blogs
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
        </>
        <Route exact path="/users" render={() => <AllUsers />} />
      </>
    </Router>
  );
};

export default Menu;
