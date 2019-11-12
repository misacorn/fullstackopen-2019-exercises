const initialState = { token: "", username: "", name: "" };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_USER":
    return action.data;
  default:
    return state;
  }
};

export default userReducer;

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: "SET_USER",
      data: user
    });
  };
};
