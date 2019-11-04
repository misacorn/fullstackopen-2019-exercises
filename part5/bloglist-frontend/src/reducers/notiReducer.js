const notiReducer = (state = "", action) => {
  switch (action.type) {
  case "SET_NOTI":
    return action.content;
  case "CLEAR_NOTI":
    return "";
  default:
    return state;
  }
};

export const setNotification = (content, seconds) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTI",
      content
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTI"
      });
    }, seconds);
  };
};

export default notiReducer;
