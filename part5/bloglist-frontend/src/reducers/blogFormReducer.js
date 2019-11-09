const initialState = {
  title: "",
  author: "",
  url: "",
  likes: ""
};

const blogFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case "UPDATE_FORM":
    return { ...state, [action.key]: action.data };
  case "RESET_FORM":
    return initialState;
  default:
    return state;
  }
};

export default blogFormReducer;

export const updateForm = (key, data) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_FORM",
      key,
      data
    });
  };
};

export const resetForm = () => {
  return dispatch => {
    dispatch({
      type: "RESET_FORM"
    });
  };
};
