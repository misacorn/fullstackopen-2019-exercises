import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdotesReducer";
import { notiShow } from "../reducers/notiReducer";

const AnecdoteList = props => {
  const { anecdotes, filter } = props;

  const vote = anecdote => {
    props.addVote(anecdote.id);
    props.notiShow(`you voted '${anecdote.content}'`);
    setTimeout(() => {
      props.store.dispatch(notiShow(null));
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  addVote,
  notiShow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
