import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import anecdotesReducer, {
  initializeAnecdotes
} from "./reducers/anecdotesReducer";
import notiReducer from "./reducers/notiReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteService from "./services/anecdotes";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  noti: notiReducer,
  filter: filterReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

anecdoteService
  .getAll()
  .then(anecdotes => store.dispatch(initializeAnecdotes(anecdotes)));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();
store.subscribe(render);
