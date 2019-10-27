import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("renders all blogs it gets from backend", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector(".blog"));

    const blogs = component.container.querySelectorAll(".blog");
    expect(blogs.length).toBe(5);
  });

  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    // expectations here

    
  });
});