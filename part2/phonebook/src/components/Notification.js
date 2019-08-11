import React from "react";
import styled from "styled-components";

const NotificationWrapper = styled.div`
  color: ${props => (props.hasError ? "red" : "green")};
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Notification = ({ message, hasError }) => {
  return (
    <NotificationWrapper hasError={hasError}>
      <div className="message">{message}</div>
    </NotificationWrapper>
  );
};

export default Notification;
