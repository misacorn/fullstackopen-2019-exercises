import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState([]);
  const [likes, setLikes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [createVisible, setCreateVibisle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await blogService.getAll();
      setBlogs(result);
    };
    fetchData();
  }, []);

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
        username,
        password
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setHasError(true);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? "none" : "" };
    const showWhenVisible = { display: createVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVibisle(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog
            title={title}
            author={author}
            url={url}
            likes={likes}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleLikesChange={({ target }) => setLikes(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setCreateVibisle(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const addBlog = e => {
    e.preventDefault();
    const blogObject = {
      title,
      author,
      url,
      likes
    };
    blogService.create(blogObject).then(data => {
      setBlogs(blogs.concat(data));
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes("");
      setSuccessMessage(`Added a new blog: ${title} by ${author}`);
      setHasError(false);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    console.log(window.localStorage);
  };

  return (
    <div>
      {successMessage ? (
        <Notification message={successMessage} hasError={hasError} />
      ) : errorMessage ? (
        <Notification message={errorMessage} hasError={hasError} />
      ) : null}
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
          <ul>
            {blogs.map(blog =>
              blog.user.name === user.name ? (
                <Blog key={blog.id} blog={blog} />
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
