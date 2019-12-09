import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Authors from "./Authors";

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  return (
    <Query query={ALL_AUTHORS}>{result => <Authors result={result} />}</Query>
  );
};

export default App;
