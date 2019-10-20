import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "AAA",
    author: "BBB",
    url: "CCC",
    likes: 0,
    user: {
      name: "DDD"
    }
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("BBB");
});
