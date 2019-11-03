import React from "react";
import { connect } from "react-redux";

import { addVote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/notiReducer";

const AnecdoteList = props => {
  const vote = anecdote => {
    props.addVote(anecdote);
    props.setNotification(`you voted ${anecdote.content}`, 5);
  };

  return (
    <>
      {props.anecdotesToShow
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

const filteredAnecdotes = ({ anecdotes, filter }) => {
  return filter
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    : anecdotes;
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: filteredAnecdotes(state)
  };
};

const mapDispatchToProps = {
  addVote,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
