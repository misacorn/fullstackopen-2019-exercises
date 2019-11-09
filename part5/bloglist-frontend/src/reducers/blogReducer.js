import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "GET_ALL":
    return action.data;
  case "CREATE_NEW":
    return [...state, action.data];
  case "ADD_LIKES": {
    const id = action.data.id;
    const blogToChange = state.find(blog => blog.id === id);
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
    return state.map(blog => (blog.id !== id ? blog : changedBlog));
  }
  case "REMOVE_BLOG": {
    const id = action.data.id;
    const blogToRemove = state.filter(blog => blog.id !== id);
    return blogToRemove;
  }
  default:
    return state;
  }
};

export default blogReducer;

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "GET_ALL",
      data: blogs
    });
  };
};

export const addNewBlog = () => {
  return async dispatch => {
    const newBlog = await blogService.create();
    dispatch({
      type: "NEW_ANECDOTE",
      data: newBlog
    });
  };
};

export const addLikes = blog => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    const updatedBlog = await blogService.update(changedBlog);
    dispatch({
      type: "ADD_LIKES",
      data: updatedBlog
    });
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    const removedBlog = await blogService.deletion(blog);
    dispatch({
      type: "REMOVE_BLOG",
      data: removedBlog
    });
  };
};
