import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  let component;

  beforeEach(() => {
    component = render(<App />);
  });

  test("renders all blogs it gets from backend", async () => {
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector(".blog"));

    const blogs = component.container.querySelectorAll(".blog");
    expect(blogs.length).toBe(5);
  });

  test("1st test: if no user logged, blogs are not rendered", async () => {
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    expect(component.container).toHaveTextContent("login");
    expect(component.container).toHaveTextContent("username");
    expect(component.container).toHaveTextContent("password");
    expect(component.container).not.toHaveTextContent("111");
    expect(component.container).not.toHaveTextContent("222");
  });

  test("2nd test: if no user logged, blogs are not rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Teuvo Testaaja"
    };

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

    component.rerender(<App />);

    await waitForElement(() => component.getByText("create"));
    expect(component.container).not.toHaveTextContent("username");
    expect(component.container).not.toHaveTextContent("password");
  });
});
