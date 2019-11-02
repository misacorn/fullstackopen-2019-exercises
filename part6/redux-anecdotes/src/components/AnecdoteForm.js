import React from "react";
import { connect } from "react-redux";

import { addAnec } from "../reducers/anecdotesReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = props => {
  const addNew = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    props.addAnec(newAnecdote);
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
