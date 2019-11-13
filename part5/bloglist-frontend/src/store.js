import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import notiReducer from "./reducers/notiReducer";
import blogFormReducer from "./reducers/blogFormReducer";
import userReducer from "./reducers/userReducer";
import allUserReducer from "./reducers/allUserReducer";

const reducers = combineReducers({
  blogs: blogReducer,
  noti: notiReducer,
  blogForm: blogFormReducer,
  user: userReducer,
  allUsers: allUserReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
