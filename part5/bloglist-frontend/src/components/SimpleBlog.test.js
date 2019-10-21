import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import SimpleBlog from "./SimpleBlog";

test("renders the title, author and amount of likes", () => {
  const simpleBlog = {
    title: "AAA",
    author: "BBB",
    likes: 0
  };

  const component = render(<SimpleBlog blog={simpleBlog} />);

  // *** print the HTML rendered by the component to the console
  // component.debug();

  // *** print the smaller part of the component
  // const li = component.container.querySelector("li");
  // console.log(prettyDOM(li));

  expect(component.container).toHaveTextContent("AAA");

  expect(component.container.querySelector(".simpleBlog")).toHaveTextContent(
    "BBB"
  );

  expect(component.container.querySelector(".simpleBlog")).toHaveTextContent(
    "0"
  );
});

test("when the button is pressed twice", () => {
  const blog = {
    title: "AAA",
    author: "BBB",
    likes: 0
  };

  const mockHandler = jest.fn();
  const forEach = (items, callback) => {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  };
  forEach([0], mockHandler);

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText("like");
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
