import { useState, useEffect } from "react";
import { API_KEY } from "./keys";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState("");
  const [text, setText] = useState("");

  const getData = (e) => {
    console.log(data);
    console.log("city", city);
    e.preventDefault();
    if (city !== null) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("response", response);
          if (response.cod === 200) {
            setText("FOUND CITY !");
            setData(response);
          } else {
            setText("CITY NOT FOUND");
          }
        });
    }
  };
  const cancelRefresh = (e) => {
    e.preventDefault();
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
      <motion.h3
        className="subtittle"
        initial={{ color: "#fff", scale: 0.5 }}
        transition={{ duration: 1.3 }}
        animate={{ y: 30, color: "#000", scale: 1 }}
      >
        Weather Fusion is a free application with which you can get the weather
        of any city in the world.
      </motion.h3>
      <div className="mainnuevo">
        <form
          className="form-info"
          onSubmit={(e) => cancelRefresh(e)}
        >
          <input
            onChange={(e) => setCity(e.target.value)}
            autoFocus
            className="m-3"
            type="text"
            placeholder="City"
          />
          <p
            className={
              text !== "CITY NOT FOUND"
                ? "msgRequestsuccess"
                : "msgRequestError"
            }
          >
            {text}
          </p>
          <button
            onClick={(e) => getData(e)}
            type="button"
            className="btn-send"
          >
            SEND
          </button>
        </form>
        {data === undefined ? (
          <>
            <div className="primerapartelista">
              <ul>
                <li>City:</li>
                <li>Country:</li>
                <li>Weather:</li>
                <li>humidity:</li>
                <li>pressure:</li>
              </ul>
            </div>
            <div className="segundapartelista">
              <ul>
                <li>temperature:</li>
                <li>minimum temperature:</li>
                <li>maximum temperature:</li>
                <li>visibility:</li>
                <li>Wind speed:</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="primerapartelista">
              <ul>
                <li>City: {data?.name}</li>
                <li>Country: {data?.sys?.country}</li>
                <li>Weather: {data?.weather[0]?.main}</li>
                <li>humidity: {data?.main?.humidity}</li>
                <li>pressure: {data?.main?.pressure}</li>
              </ul>
            </div>
            <div className="segundapartelista">
              <ul>
                <li>temperature: {data?.main?.temp}</li>
                <li>minimum temperature: {data?.main?.temp_min} C°</li>
                <li>maximum temperature: {data?.main?.temp_max} C°</li>
                <li>visibility: {data?.visibility}</li>
                <li>Wind speed: {data?.wind?.speed}</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
