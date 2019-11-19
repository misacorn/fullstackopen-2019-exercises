import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";


const NotiWrapper = styled.div`
  /* color: ${props => (props.hasError ? "red" : "green")}; */
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Notification = ({ noti }) => {
  return noti && <NotiWrapper>{noti}</NotiWrapper>;
};

const mapStateToProps = state => {
  return {
    noti: state.noti
  };
};

export default connect(mapStateToProps)(Notification);
