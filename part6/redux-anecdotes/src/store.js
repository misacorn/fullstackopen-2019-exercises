import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import anecdotesReducer from "./reducers/anecdotesReducer";
import notiReducer from "./reducers/notiReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  noti: notiReducer,
  filter: filterReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
