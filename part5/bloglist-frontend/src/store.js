import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import notiReducer from "./reducers/notiReducer";
import blogFormReducer from "./reducers/blogFormReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  noti: notiReducer,
  blogForm: blogFormReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
