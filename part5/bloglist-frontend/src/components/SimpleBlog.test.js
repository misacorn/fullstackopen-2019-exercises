import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

test("renders the title, author and amount of likes", () => {
  const simpleBlog = {
    title: "AAA",
    author: "BBB",
    likes: 0
  };

  const component = render(<SimpleBlog blog={simpleBlog} />);

  expect(component.container).toHaveTextContent("AAA");

  expect(component.container.querySelector(".simpleBlog")).toHaveTextContent(
    "BBB"
  );

  expect(component.container.querySelector(".simpleBlog")).toHaveTextContent(
    "0"
  );
});
