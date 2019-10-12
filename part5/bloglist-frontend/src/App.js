import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";

import Notification from "./components/Notification";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      console.log({ exception });
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username: {""}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: {""}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        Author:
        <input value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        Url:
        <input value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div>
        Likes:
        <input value={likes} onChange={e => setLikes(e.target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );

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
      setSuccessMessage(`Added a new blog!`);
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
      {errorMessage ? (
        <Notification message={errorMessage} />
      ) : successMessage ? (
        <Notification message={successMessage} />
      ) : null}
      {user === null ? (
        loginForm()
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
