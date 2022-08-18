import { useState, useEffect } from "react";
import "./App.css";
import { API_KEY } from "./keys";

function App() {
  const [data, setData] = useState();
  console.log(data);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);
  return (
    <div className="App bg-secondary">
      <div className="container">
        <div className="row p-3">
          <div className="col-6 mx-auto mt-5 prueba">
            <form className="form-control d-flex flex-column">
              <input className="m-3" type="text" placeholder="City" />
              <input className="m-3" type="text" placeholder="Country" />
              <button type="button" className="btn btn-primary m-3">
                SEND
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mx-auto d-flex flex-row">
            {data === undefined ? null : (
              <>
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
                <img
                className="mx-auto"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                  alt="clima"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
