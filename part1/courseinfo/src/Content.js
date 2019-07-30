import React from "react";
import Header from "./Header";
import Part from "./Part";

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.name}>
          <Header name={course.name} />
          {course.parts.map(part => (
            <Part name={part.name} exercises={part.exercises} key={part.name}>
              {part.name}
              {part.exercises}
            </Part>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Content;
