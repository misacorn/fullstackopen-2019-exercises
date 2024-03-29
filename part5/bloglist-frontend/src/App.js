import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useField } from "./hooks";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import AllUsers from "./components/AllUsers";
import User from "./components/User";
import Header from "./components/Header";

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
  allUsers,
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

  const rows = () =>
    blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(blog => <Blogs key={blog.id} blog={blog} />);

  return (
    <Container>
      <Notification />
      {!user.username ? (
        <>
          <h2>Blogs</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <Router>
            <Header user={user} logout={logout}></Header>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <h2>Blog App</h2>
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
                  <AllUsers allUsers={allUsers} />
                </>
              )}
            />
            <Route
              path="/users/:id"
              render={({
                match: {
                  params: { id }
                }
              }) => (
                <>
                  <User id={id} allUsers={allUsers} />
                </>
              )}
            />
            <Route
              path="/blogs/:id"
              render={({
                match: {
                  params: { id }
                }
              }) => (
                <>
                  <Blog
                    id={id}
                    increaseLikes={increaseLikes}
                    removeBlog={removeBlog}
                  />
                </>
              )}
            />
          </Router>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    blogFormState: state.blogForm,
    user: state.user,
    allUsers: state.allUsers
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
