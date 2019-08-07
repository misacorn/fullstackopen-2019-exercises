import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country[0].capital
        }&appid=40c733ecd537be7e11b333e13f0181bc`
      )
      .then(response => {
        setWeather(response.data);
      });
  }, [country]);

  console.log(weather);

  // const temperature = (weather.main.temp) => {weather.main.temp - 273.15};
  // const speed = s => (s * 1.609).toFixed(2);

  return (
    <>
      <h1>{country[0].name}</h1>
      <div>Capital: {country[0].capital}</div>
      <div>Population: {country[0].population}</div>
      <h2>Languages</h2>
      <ul>
        {country[0].languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country[0].flag} width="200" alt="nationalFlag" />
      <h2>Weather in {country[0].capital}</h2>
      {!isEmpty(weather) && (
        <>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
          <img
            alt="generalWeather"
            src={`http://openweathermap.org/img/w/${
              weather.weather[0].icon
            }.png`}
          />
          <p>Speed: {(weather.wind.speed * 1.609).toFixed(2)}km/h</p>
        </>
      )}
    </>
  );
};

export default Country;
