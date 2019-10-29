import React from "react";
import { addAnec } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
  const createNew = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.store.dispatch(addAnec(content));
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

export default AnecdoteForm;
