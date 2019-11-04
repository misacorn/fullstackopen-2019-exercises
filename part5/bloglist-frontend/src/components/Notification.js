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
    <NotificationWrapper hasError={hasError.value}>
      <div className="message">{message.value}</div>
    </NotificationWrapper>
  );
};

// const mapStateToProps = state => {
//   return {
//     noti: state.noti
//   };
// };

export default Notification;
