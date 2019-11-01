import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  const { noti } = props;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  return noti && <div style={style}>{noti}</div>;
};

const mapStateToProps = state => {
  return {
    noti: state.noti
  };
};

export default connect(mapStateToProps)(Notification);
