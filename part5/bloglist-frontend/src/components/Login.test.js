import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";

const Wrapper = props => {
  const handleUsernameChange = event => {
    props.state.username = event.target.value;
  };

  const handlePasswordChange = event => {
    props.state.password = event.target.value;
  };

  return (
    <Login
      username={props.state.username}
      password={props.state.password}
      onSubmit={props.onSubmit}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
    />
  );
};

test("<Login /> updates parent state and calls onSubmit", () => {
  const onSubmit = jest.fn();
  const state = {
    username: "",
    password: ""
  };

  const component = render(<Wrapper onSubmit={onSubmit} state={state} />);

  const input1 = component.container.querySelector(".input1");
  const input2 = component.container.querySelector(".input2");
  const form = component.container.querySelector("form");

  fireEvent.change(input1, {
    target: { value: "abc" }
  });
  fireEvent.change(input2, {
    target: { value: "123" }
  });
  fireEvent.submit(form);

  expect(onSubmit.mock.calls.length).toBe(1);
  expect(state.username).toBe("abc");
  expect(state.password).toBe("123");
});
