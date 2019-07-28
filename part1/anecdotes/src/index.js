import React, { useState } from "react";
import ReactDOM from "react-dom";

const MostVoted = ({ votes, anecdotes }) => {
  const mostVotedNumber = Math.max(...Object.values(votes));
  const mostVotedQuote = Object.keys(votes)
    .filter(v => votes[v] === mostVotedNumber)
    .join(",");
  return (
    <div>
      {mostVotedQuote.length > 1 && mostVotedNumber > 0 ? (
        <p>There are more than 1 most voted quote!</p>
      ) : (
        <p>{anecdotes[mostVotedQuote]}</p>
      )}
      {mostVotedNumber > 0 && <p>has {mostVotedNumber} votes</p>}
    </div>
  );
};

const App = ({ anecdotes, votesObj }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesObj);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button
        onClick={() => {
          setVotes({ ...votes, [selected]: votes[selected] + 1 });
        }}
      >
        Vote
      </button>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        Next Anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

const votesObj = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(
  <App anecdotes={anecdotes} votesObj={votesObj} />,
  document.getElementById("root")
);
