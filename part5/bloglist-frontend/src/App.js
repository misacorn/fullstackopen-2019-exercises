import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";

import Notification from "./components/Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
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

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      {errorMessage && <Notification message={errorMessage} />}
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            blog.user.name === user.name ? (
              <Blog key={blog.id} blog={blog} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default App;
