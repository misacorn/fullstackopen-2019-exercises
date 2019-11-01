import React from "react";
import { addVote } from "../reducers/anecdotesReducer";
import { notiShow } from "../reducers/notiReducer";

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();

  const vote = anecdote => {
    store.dispatch(addVote(anecdote.id));
    store.dispatch(notiShow(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      store.dispatch(notiShow(null));
    }, 5000);
  };

  const filteredAnecdotes = filter
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    : anecdotes;

  return (
    <>
      {filteredAnecdotes
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
