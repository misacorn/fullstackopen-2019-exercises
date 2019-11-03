import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import AnecdoteList from "./AnecdoteList";
import About from "./About";
import CreateNew from "./CreateNew";

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  };
  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">
            anecdotes
          </Link>
          <Link style={padding} to="/create">
            create new
          </Link>
          <Link style={padding} to="/about">
            about
          </Link>
        </div>
        <Route
          exact
          path="/"
          render={() => <AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/create" render={() => <CreateNew addNew={addNew} />} />
        <Route path="/about" render={() => <About />} />
      </div>
    </Router>
  );
};

export default Menu;
