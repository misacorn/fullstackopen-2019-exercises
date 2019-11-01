const notiReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.noti;
    default:
      return state;
  }
};

export const notiShow = noti => {
  return {
    type: "SET_NOTI",
    noti
  };
};

export default notiReducer;
