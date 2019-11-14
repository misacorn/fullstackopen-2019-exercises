import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AnecdoteList from "./AnecdoteList";
import About from "./About";
import CreateNew from "./CreateNew";
import Anecdote from "./Anecdote";

const Menu = ({
  anecdotes,
  addNew,
  anecdoteById,
  notification,
  setNotification
}) => {
  const padding = {
    paddingRight: 5
  };

  return (
    <Router>
      <>
        <>
          <Link style={padding} to="/">
            anecdotes
          </Link>
          <Link style={padding} to="/create">
            create new
          </Link>
          <Link style={padding} to="/about">
            about
          </Link>
        </>

        {notification ? <p>{notification}</p> : null}

        <Route
          exact
          path="/"
          render={() => <AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          exact
          path="/create"
          render={() => (
            <CreateNew addNew={addNew} setNotification={setNotification} />
          )}
        />
        <Route exact path="/about" render={() => <About />} />
        <Route
          exact
          path="/anecdotes/:id"
          render={({ match }) => (
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          )}
        />
      </>
    </Router>
  );
};

export default Menu;
