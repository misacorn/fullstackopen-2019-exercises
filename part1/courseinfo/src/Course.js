import React from "react";

import Content from "./Content";
// import Total from "./Total";

const Course = ({ courses }) => (
  <>
    <Content courses={courses} />
    {/* <Total courses={courses} /> */}
  </>
);

export default Course;
