import React from "react";
import propTypes from "prop-types";

const Login = ({
  onSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input
            className="input1"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password:
          <input
            className="input2"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onSubmit: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired
};

export default Login;
