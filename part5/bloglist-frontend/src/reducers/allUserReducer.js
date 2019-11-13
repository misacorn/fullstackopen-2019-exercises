const initialState = [];

const allUserReducer = (state = initialState, action) => {
  switch (action.type) {
  case "ADD_NEW":
    return [...state, action.data];
  default:
    return state;
  }
};

export default allUserReducer;

export const addUser = (username, blogs) => {
  return {
    type: "ADD_NEW",
    data: { username, blogsCreated: blogs.length }
  };
};
