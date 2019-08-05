import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <p>Total of {total} exercises</p>;
};

export default Total;
