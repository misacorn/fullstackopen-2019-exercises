import React, { useState, useImperativeHandle } from "react";
import propTypes from "prop-types";

const TogglableBlog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <p onClick={toggleVisibility} style={blogStyle}>
          {props.title} - {props.author}
        </p>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <p onClick={toggleVisibility} style={blogStyle}>
          {props.title} - {props.author}
        </p>
        {props.children}
      </div>
    </div>
  );
});

TogglableBlog.propTypes = {
  title: propTypes.string.isRequired,
  author: propTypes.string.isRequired
};

export default TogglableBlog;
