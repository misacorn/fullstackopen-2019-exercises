import React, { useState } from "react";

const TogglableBlog = props => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <p onClick={toggleVisibility}>{props.title}</p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleVisibility}>{props.title}</p>
        {props.children}
      </div>
    </div>
  );
};

export default TogglableBlog;
