import React from "react";
import propTypes from "prop-types";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const Padding = styled.div`
  padding: 15px 0;
`;

const Login = ({ onSubmit, username, password }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          Username:
          <Input
            className="input1"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          Password:
          <Input
            className="input2"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <Padding>
          <Button type="submit">login</Button>
        </Padding>
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
