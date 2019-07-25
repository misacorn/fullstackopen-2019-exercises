import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return (
    <div>
      <p>Good is {good}</p>
      <p>Neutral is {neutral}</p>
      <p>Bad is {bad}</p>
      <p>All is {total}</p>
      <p>Average is {total / 3}</p>
      <p>Positive is {good / total}%</p>
    </div>
  );
};

export default Statistics;
