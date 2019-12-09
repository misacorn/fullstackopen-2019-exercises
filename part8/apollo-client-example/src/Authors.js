import React from "react";

const Authors = ({ result }) => {
  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Persons</h2>
      {authors.map(p => (
        <div key={p.id}>
          {p.name} - {p.born}
        </div>
      ))}
    </div>
  );
};

export default Authors;
