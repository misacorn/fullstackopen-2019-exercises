import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TogglableBlog from "./TogglableBlog";

describe("<TogglableBlog />", () => {
  let component;

  beforeEach(() => {
    component = render(
      <TogglableBlog title="show..." author="show...">
        <div className="testDiv" />
      </TogglableBlog>
    );
  });

  test("only the name and author of the blog post are shown by default", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("other information of the blog post becomes visible when blog post is clicked", () => {
    const button = component.getByText("show...");
    fireEvent.click(button);
    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
    // component.debug();
  });
});
