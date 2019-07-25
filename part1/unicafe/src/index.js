import React, { useState } from "react";
import ReactDOM from "react-dom";

import Statistics from "./Statistics";

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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
