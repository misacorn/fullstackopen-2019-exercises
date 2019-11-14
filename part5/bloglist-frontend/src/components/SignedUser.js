import React from "react";

const SignedUser = ({ name, logout }) => {
  return (
    <>
      <h2>Blogs</h2>
      <>
        {name} logged in
        <p>
          <button onClick={logout}>logout</button>
        </p>
      </>
    </>
  );
};

export default SignedUser;
