import React from "react";
import { connect } from "react-redux";

import { filterChange } from "../reducers/filterReducer";

const Filter = props => {
  const handleChange = event => {
    props.filterChange(event.target.value.toLowerCase());
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

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

export default connect(
  mapStateToProps,
  {filterChange}
)(Filter);
