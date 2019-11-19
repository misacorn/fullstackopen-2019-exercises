import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "GET_ALL":
    return action.data;
  case "CREATE_NEW_BLOG":
    return [...state, action.data];
  case "ADD_COMMENT":
    const id = action.data.id;
    const blogToChange = state.find(blog => blog.id === id);
    const changedBlog = {
      ...blogToChange,
      comments: [...blogToChange.comments, action.data.comment]
    };
    return state.map(blog => (blog.id !== id ? blog : changedBlog));
  case "ADD_LIKES": {
    const id = action.data.id;
    const blogToChange = state.find(blog => blog.id === id);
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
    return state.map(blog => (blog.id !== id ? blog : changedBlog));
  }
  case "REMOVE_BLOG": {
    const id = action.data.id;
    const remainingBlogs = state.filter(blog => blog.id !== id);
    return remainingBlogs;
  }
  default:
    return state;
  }
};

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
      type: "CREATE_NEW_BLOG",
      data: newBlog
    });
  };
};

export const addNewComment = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.createComment(blog, comment);
    dispatch({
      type: "ADD_COMMENT",
      data: updatedBlog
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
  return dispatch => {
    blogService.deletion(blog);
    dispatch({
      type: "REMOVE_BLOG",
      data: blog
    });
  };
};

export default blogReducer;
