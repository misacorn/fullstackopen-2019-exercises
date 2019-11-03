import React, { useState } from "react";

import Menu from "./components/Menu";
import Footer from "./components/Footer";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ]);

  const [notification, setNotification] = useState("");

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  // const vote = id => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   };

  //   setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  // };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        anecdoteById={anecdoteById}
        notification={notification}
        setNotification={setNotification}
      />
      <Footer />
    </div>
  );
};

export default App;
