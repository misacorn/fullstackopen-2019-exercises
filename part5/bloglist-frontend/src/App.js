import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useField } from "./hooks";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import TogglableBlog from "./components/TogglableBlog";

import {
  getAllBlogs,
  addNewBlog,
  addLikes,
  deleteBlog
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notiReducer";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = props => {
  const [user, setUser] = useState(null);
  const username = useField("text");
  const password = useField("text");

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const likes = useField("text");

  useEffect(() => {
    props.getAllBlogs();
  }, [props]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      props.setNotification("Login succeeded!", 3000);
    } catch (exception) {
      props.setNotification(exception.response.data.error, 3000);
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
      <CreateBlog
        title={title}
        author={author}
        url={url}
        likes={likes}
        handleSubmit={addBlog}
      />
    </Togglable>
  );

  const addBlog = e => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    };
    blogService.create(blogObject).then(data => {
      props.addNewBlog(data);
      props.setNotification(
        `Added a new blog: ${title.value} by ${author.value}`
      );
    });
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    props.setNotification("Logout succeed!");
  };

  const increaseLikes = blog => {
    props.addLikes(blog);
    props.setNotification(`You voted ${blog.title}`);
  };

  const removeBlog = async blog => {
    props.deleteBlog(blog);
    props.setNotification(`Deleted ${blog.title}`);
  };

  const blogRowRef = React.createRef();

  const rows = () =>
    props.blogs
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
  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <h2>Blogs</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <div>
            {user.name} logged in {""}
            <button onClick={logout}>logout</button>
          </div>
          <h2>Create a new blog</h2>
          {blogForm()}
          {rows()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  getAllBlogs,
  addNewBlog,
  addLikes,
  setNotification,
  deleteBlog
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
