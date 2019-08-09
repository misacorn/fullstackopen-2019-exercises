import React from "react";

const Filter = ({ nameSearch, handleNameSearch }) => (
  <div>
    Filter shown with <input value={nameSearch} onChange={handleNameSearch} />
  </div>
);

export default Filter;
