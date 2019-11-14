import userService from "../services/users";

const initialState = [];

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case "GET_USERS":
    return action.data;
  default:
    return state;
  }
};

export default allUsersReducer;

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch({
      type: "GET_USERS",
      data: users
    });
  };
};
