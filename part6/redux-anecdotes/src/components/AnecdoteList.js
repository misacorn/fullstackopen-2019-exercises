import React from "react";
import { addVote } from "../reducers/anecdoteReducer";
import { notiShow } from "../reducers/notiReducer";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdote;

  const vote = anecdote => {
    store.dispatch(addVote(anecdote.id));
    store.dispatch(notiShow(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      store.dispatch(notiShow(null));
    }, 5000);
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  vote(anecdote);
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
