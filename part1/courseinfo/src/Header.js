import React from "react";

const Header = ({ courses }) => {
  const allCourses = courses.map(course => course.name);
  const headers = allCourses.map(header => <h1 key={header}>{header}</h1>);
  return <>{headers}</>;
};

export default Header;
