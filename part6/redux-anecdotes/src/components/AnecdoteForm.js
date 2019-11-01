import React from "react";
import { connect } from "react-redux";

import { addAnec } from "../reducers/anecdotesReducer";

const AnecdoteForm = props => {
  const createNew = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.addAnec(content);
    event.target.anecdote.value = "";
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { addAnec }
)(AnecdoteForm);
