import React from "react";
import propTypes from "prop-types";
import { Form } from "semantic-ui-react";
import styled from "styled-components";

const Padding = styled.div`
  padding-bottom: 15px;
`;

const Login = ({ onSubmit, username, password }) => {
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            id="username"
            label="Username"
            placeholder="Username"
            className="input1"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
          <Form.Input
            fluid
            id="password"
            label="Password"
            placeholder="Password"
            className="input2"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Group>
        <Padding>
          <Form.Button id="login">Login</Form.Button>
        </Padding>
      </Form>
    </div>
  );
};

Login.propTypes = {
  onSubmit: propTypes.func.isRequired,
  username: propTypes.object.isRequired,
  password: propTypes.object.isRequired
};

export default Login;
