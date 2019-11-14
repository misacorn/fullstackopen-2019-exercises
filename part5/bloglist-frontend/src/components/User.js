import React from "react";

const User = ({ id, allUsers }) => {
  const userById = allUsers.find(user => user.id === id);
  const showBlogs = () =>
    userById.blogs.map(blog => <li key={blog.id}>{blog.title}</li>);

  return (
    <>
      {userById && userById.blogs && (
        <>
          <h2>{userById.name}</h2>
          <h4>added blogs</h4>
          {showBlogs()}
        </>
      )}
    </>
  );
};

export default User;
