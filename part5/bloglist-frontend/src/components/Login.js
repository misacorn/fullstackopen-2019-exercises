import React from "react";
import propTypes from "prop-types";
import { Button } from "semantic-ui-react";

const Login = ({ onSubmit, username, password }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input
            className="input1"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          Password:
          <input
            className="input2"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onSubmit: propTypes.func.isRequired,
  username: propTypes.object.isRequired,
  password: propTypes.object.isRequired
};

export default Login;
