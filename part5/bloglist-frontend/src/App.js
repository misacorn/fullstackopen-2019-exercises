import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useField } from "./hooks";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import TogglableBlog from "./components/TogglableBlog";
import AllUsers from "./components/AllUsers";

import {
  getAllBlogs,
  addNewBlog,
  addLikes,
  deleteBlog
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notiReducer";
import { resetForm } from "./reducers/blogFormReducer";
import { setUser, resetUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/allUsersReducer";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = ({
  blogs,
  setNotification,
  addLikes,
  deleteBlog,
  blogFormState,
  getAllBlogs,
  addNewBlog,
  resetForm,
  setUser,
  user,
  getAllUsers,
  resetUser
}) => {
  const username = useField("text");
  const password = useField("text");

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const persistedUser = JSON.parse(loggedUserJSON);
      setUser(persistedUser);
      blogService.setToken(persistedUser.token);
    }
  }, [setUser]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      if (user) {
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      }
      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      setNotification("Login succeeded!", 3000);
    } catch (exception) {
      setNotification(exception.response.data.error, 3000);
    }
  };

  const loginFormRef = React.createRef();

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <Login username={username} password={password} onSubmit={handleLogin} />
    </Togglable>
  );

  const blogFormRef = React.createRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <CreateBlog handleSubmit={addBlog} />
    </Togglable>
  );

  const addBlog = e => {
    const { title, author, url, likes } = blogFormState;
    e.preventDefault();
    try {
      blogFormRef.current.toggleVisibility();
      const blogObject = {
        title,
        author,
        url,
        likes
      };
      blogService.create(blogObject).then(data => {
        addNewBlog(data);
        setNotification(`Added a new blog: ${title} by ${author}`, 3000);
        resetForm();
      });
    } catch (exception) {
      setNotification(exception.response.data.error, 3000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    resetUser();
    setNotification("Logout succeed!", 3000);
  };

  const increaseLikes = blog => {
    addLikes(blog);
    setNotification(`You voted ${blog.title}`, 3000);
  };

  const removeBlog = async blog => {
    deleteBlog(blog);
    setNotification(`Deleted ${blog.title}`, 3000);
  };

  const blogRowRef = React.createRef();

  const rows = () =>
    blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(blog =>
        blog.user.name === user.name ? (
          <TogglableBlog
            key={blog.id}
            title={blog.title}
            author={blog.author}
            ref={blogRowRef}
          >
            <Blog
              key={blog.id}
              blog={blog}
              increaseLikes={() => increaseLikes(blog)}
              removeBlog={() => removeBlog(blog)}
            />
          </TogglableBlog>
        ) : null
      );

  const padding = {
    paddingRight: 15
  };

  return (
    <>
      <Notification />
      {!user.username ? (
        <>
          <h2>Blogs</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <Router>
            <>
              <Link style={padding} to="/">
                Blogs
              </Link>
              <Link style={padding} to="/users">
                Users
              </Link>
            </>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <h2>Blogs</h2>
                  <>
                    {user.name} logged in
                    <p>
                      <button onClick={logout}>logout</button>
                    </p>
                  </>
                  <h2>Create a new blog</h2>
                  {blogForm()}
                  {rows()}
                </>
              )}
            />
            <Route
              exact
              path="/users"
              render={() => (
                <>
                  <h2>Blogs</h2>
                  <>
                    {user.name} logged in
                    <p>
                      <button onClick={logout}>logout</button>
                    </p>
                  </>
                  <AllUsers />
                </>
              )}
            />
          </Router>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    blogFormState: state.blogForm,
    user: state.user
  };
};

const mapDispatchToProps = {
  getAllBlogs,
  addNewBlog,
  addLikes,
  setNotification,
  deleteBlog,
  resetForm,
  setUser,
  resetUser,
  getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
