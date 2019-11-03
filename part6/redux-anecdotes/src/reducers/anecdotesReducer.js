import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anec => (anec.id !== id ? anec : changedAnecdote));
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const addAnec = () => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew();
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnec
    });
  };
};

//Solution
export const addVote = anecdote => {
  return async dispatch => {
    const changedAnec = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    const updatedAnec = await anecdoteService.update(changedAnec);
    dispatch({
      type: "VOTE",
      data: updatedAnec
    });
  };
};

export default anecdoteReducer;
