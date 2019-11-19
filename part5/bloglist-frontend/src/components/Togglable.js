import React, { useState, useImperativeHandle } from "react";
import propTypes from "prop-types";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const PaddingBottom = styled.div`
  padding-bottom: 15px;
`;

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <PaddingBottom>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </PaddingBottom>
  );
});

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
};

export default Togglable;
