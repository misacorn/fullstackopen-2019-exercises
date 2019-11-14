import userService from "../services/users";

const initialState = [];

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case "GET_USERS":
    return action.data;
  case "ADD_NEW":
    return [...state, action.data];
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

export const addUser = users => {
  return {
    type: "ADD_NEW",
    data: users
  };
};
