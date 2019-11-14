const initialState = [];

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case "ADD_NEW":
    return [...state, action.data];
  default:
    return state;
  }
};

export default allUsersReducer;

export const addUser = (users) => {
  return {
    type: "ADD_NEW",
    data: users
  };
};
