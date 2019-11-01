import React from "react";
import { filterChange } from "../reducers/filterReducer";

const Filter = ({ store }) => {
  const handleChange = event => {
    // input-field value is in variable event.target.value
    store.dispatch(filterChange(event.target.value.toLowerCase()));
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
