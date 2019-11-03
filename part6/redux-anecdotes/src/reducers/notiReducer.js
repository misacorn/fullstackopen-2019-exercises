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
    }, seconds * 1000);
  };
};

export const clearNotification = () => ({
  type: "CLEAR_NOTI"
});

export default notiReducer;
