import React from "react";

import { getId } from "./reducers/anecdoteReducer";

const App = props => {
  const anecdotes = props.store.getState();

  const vote = id => {
    props.store.dispatch({
      type: "VOTE",
      data: {
        id
      }
    });
  };

  const createNew = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.store.dispatch({
      type: "NEW_ANECDOTE",
      data: {
        content,
        id: getId(),
        votes: 0
      }
    });
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
