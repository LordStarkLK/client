import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./style.css";

const api = {
  key: "45f4787c2773aa4d8b5d6deca67a66c4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={weather.main.temp<20?'App cold':'App warm'}>
      <main className="d-flex align-items-center flex-column">
        <Form className="m-3 w-75" onSubmit={(evt) => evt.preventDefault()}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search City"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </Form.Group>
        </Form>
        {(typeof weather.main != "undefined") ? (<div>
          <div className="locationDate">
            <div className="location">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
            </div>
            <div className="date">
              <h5>{dateBuilder(new Date())}</h5>
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              <h1 className="display-1">{weather.main.temp}°C</h1>
            </div>
            <div className="weather">
              <h6 className="display-6">{weather.weather[0].main}</h6>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}></img>
            </div>
          </div>
        </div>) : (<h2>Enter a city</h2>)}

      </main>
    </div>
  );
}

export default App;
