const notiReducer = (state = "Helu", action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.noti;
    default:
      return state;
  }
};

export const notiChange = noti => {
  return {
    type: "SET_FILTER",
    noti
  };
};

export default notiReducer;
