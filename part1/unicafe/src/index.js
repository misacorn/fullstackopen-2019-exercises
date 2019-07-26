import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

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
        <Statistics good={good} bad={bad} neutral={neutral} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
