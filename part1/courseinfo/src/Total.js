import React from "react";

const Total = props => (
  <p style={{ fontWeight: "bold" }}>
    Total of{" "}
    {props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises}{" "}
    exercises
  </p>
);

export default Total;
