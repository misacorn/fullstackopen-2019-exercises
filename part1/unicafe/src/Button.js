import React from "react";

const Button = ({ feedback, setFeedback, text }) => (
  <button
    onClick={() => {
      setFeedback(feedback + 1);
    }}
  >
    {text}
  </button>
);

export default Button;
