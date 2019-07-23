import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button
        onClick={() => {
          setGood(good + 1);
        }}
      >
        Good
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
      >
        Bad
      </button>
      <button
        onClick={() => {
          setBad(bad + 1);
        }}
      >
        Neutral
      </button>
      <h1>Statistics</h1>
      <p>Good is {good}</p>
      <p>Neutral is {neutral}</p>
      <p>Bad is {bad}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
