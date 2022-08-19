import { useState, useEffect } from "react";
import { API_KEY } from "./keys";
import { motion } from "framer-motion";
import "./App.css";
import fondo from "./assets/fondo.jpg";

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState("");

  const getData = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  };

  return (
    <div className="App">
      <motion.h1
        className="titulo"
        initial={{ color: "#fff", scale: 0.5 }}
        transition={{ duration: 1.3 }}
        animate={{ y: 30, color: "#000", scale: 1 }}
      >
        Meteo Fusion
      </motion.h1>
      <div className="main">
        <div className="lado-izquierdo">
          <motion.h3
            initial={{ color: "#fff", scale: 0.5 }}
            transition={{ duration: 1.3 }}
            animate={{ y: 30, color: "#000", scale: 1 }}
          >
            Weather Fusion is a free application with which you can get the
            weather of any city in the world.
          </motion.h3>
          <div>
            <div>
              <form className="form-control d-flex flex-column">
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className="m-3"
                  type="text"
                  placeholder="City"
                />
                <button
                  onClick={(e) => getData(e)}
                  type="button"
                  className="btn btn-primary m-3"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="lado-derecho">
          <>
            {data === undefined ? null : (
              <div
                className="flex-derecha"
              >
                <img
                  className="imgClima"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                  alt="clima"
                />
                <ul>
                  <li>City: {data.name}</li>
                  <li>Country: {data.sys?.country}</li>
                  <li>Weather: {data.weather[0].main}</li>
                  <li>temperature: {data.main.temp}</li>
                  <li>minimum temperature: {data.main.temp_min} C°</li>
                  <li>maximum temperature: {data.main.temp_max} C°</li>
                  <li>humidity: {data.main.humidity}</li>
                  <li>pressure: {data.main.pressure}</li>
                  <li>visibility: {data.visibility}</li>
                  <li>Wind speed: {data.wind.speed}</li>
                </ul>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
