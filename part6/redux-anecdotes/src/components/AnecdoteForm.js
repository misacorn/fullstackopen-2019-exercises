import React from "react";
import { connect } from "react-redux";

import { addAnec } from "../reducers/anecdotesReducer";

const AnecdoteForm = props => {
  const addNew = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.addAnec(content);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
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
