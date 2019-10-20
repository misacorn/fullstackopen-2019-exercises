import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
          {props.title}
        </p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleVisibility} style={blogStyle}>
          {props.title}
        </p>
        {props.children}
      </div>
    </div>
  );
});

TogglableBlog.PropTypes = {
  title: PropTypes.string.isRequired
};

export default TogglableBlog;
