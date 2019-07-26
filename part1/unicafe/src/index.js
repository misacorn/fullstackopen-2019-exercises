import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total / 3;
  const positivity = good / total + "%";

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button feedback={good} setFeedback={setGood} text="Good" />
      <Button feedback={neutral} setFeedback={setNeutral} text="Neutral" />
      <Button feedback={bad} setFeedback={setBad} text="Bad" />
      <h1>Statistics</h1>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <Statistics text="Good" value={good} />
          <Statistics text="Bad" value={bad} />
          <Statistics text="Neutral" value={neutral} />
          <Statistics text="All" value={total} />
          <Statistics text="Average" value={average} />
          <Statistics text="Positive" value={positivity} />
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
