const initialState = { token: "", username: "", name: "" };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_USER":
    return { ...state, ...action.data };
  case "RESET_USER":
    return initialState;
  default:
    return state;
  }
};

export default userReducer;

export const setUser = user => {
  return {
    type: "SET_USER",
    data: user
  };
};

export const resetUser = () => {
  return {
    type: "RESET_USER"
  };
};
