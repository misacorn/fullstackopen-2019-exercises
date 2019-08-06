import React from "react";

const Country = ({ countryFound }) => {
  return (
    <>
      <h1>{countryFound[0].name}</h1>
      <div>Capital: {countryFound[0].capital}</div>
      <div>Population: {countryFound[0].population}</div>
      <h3>Languages</h3>
      <ul>
        {countryFound[0].languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={countryFound[0].flag} width="200" alt="nationalFlag" />
    </>
  );
};

export default Country;
