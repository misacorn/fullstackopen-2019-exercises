import React from "react";

import { addAnec, addVote } from "./reducers/anecdoteReducer";

const App = props => {
  const anecdotes = props.store.getState();

  const vote = id => {
    props.store.dispatch(addVote(id));
  };

  const createNew = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.store.dispatch(addAnec(content));
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
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

export default App;
