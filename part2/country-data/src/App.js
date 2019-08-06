import React, { useState, useEffect } from "react";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data.map(country => country.name));
    });
  }, []);

  const searchCountry = e => setSearch(e.target.value);

  const allRows = countries.map(country => <li key={country}>{country}</li>);

  const filterRows = countries
    .filter(country =>
      country.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map(country => <li key={country}>{country}</li>);

  return (
    <>
      <div>
        Find countries: <input value={search} onChange={searchCountry} />
        {search.trim().length === 0 && <ul>{allRows}</ul>}
        {filterRows.length > 10 ? (
          <div>Too many matches, specify other filter</div>
        ) : filterRows.length > 0 && filterRows.length < 10 ? (
          <ul>{filterRows}</ul>
        ) : filterRows.length === 1 ? (
          <h1>{filterRows}</h1>
        ) : (
          <div>Cannot find the country!</div>
        )}
      </div>
    </>
  );
};

export default App;
