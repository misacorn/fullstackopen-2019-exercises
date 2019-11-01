import React from "react";

const Notification = ({ store }) => {
  const { noti } = store.getState();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };


  return noti && <div style={style}>{noti}</div>;
};

export default Notification;
