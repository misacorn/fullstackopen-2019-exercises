import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  const ALL_AUTHORS = gql`
    {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {page === "authors" ? (
        <Query query={ALL_AUTHORS}>
          {result => <Authors result={result} />}
        </Query>
      ) : page === "books" ? (
        <Books />
      ) : page === "add" ? (
        <NewBook />
      ) : null}
    </div>
  );
};

export default App;
