import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data.map(country => country));
    });
  }, []);

  const searchCountry = e => setSearch(e.target.value);

  const allRows = countries.map(country => (
    <div key={country.name}>{country.name}</div>
  ));

  const filterRows = countries.filter(country =>
    country.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  // .map(country => <div key={country.callingCodes[0]}>{country.name}</div>);
  return (
    <>
      <div>
        Find countries: <input value={search} onChange={searchCountry} />
        <p />
        {search.trim().length === 0 && <div>{allRows}</div>}
        {filterRows.length > 10 ? (
          <div>Too many matches, specify other filter</div>
        ) : filterRows.length > 1 && filterRows.length < 10 ? (
          <div>
            {filterRows.map(country => (
              <div key={country.callingCodes[0]}>{country.name}</div>
            ))}
          </div>
        ) : filterRows.length === 1 ? (
          <Country countryFound={filterRows} />
        ) : (
          <div>Cannot find the country!</div>
        )}
      </div>
    </>
  );
};

export default App;
