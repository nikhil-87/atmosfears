import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

export default function SearchBar({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const weatherApiKey = import.meta.env.REACT_APP_WEATHER_API_KEY;

  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation.length === 2) {
      async function userLocationWeather() {
        try {
          let response = await fetch(
            `${API_URL}lat=${userLocation[0]}&lon=${userLocation[1]}&appid=${weatherApiKey}&units=metric`
          );
          let jsonResponse = await response.json();
          let result = {
            temp: jsonResponse.main.temp,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            city: jsonResponse.name,
            country: jsonResponse.sys.country,
            weatherMain: jsonResponse.weather[0].main,
            // weather_icon:jsonResponse.weather[0].icon,
            weatherCondition: jsonResponse.weather[0].description,
          };
          console.log(result);
          updateInfo(result);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
      userLocationWeather();
    }
  }, [userLocation]);

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}q=${city}&appid=${weatherApiKey}&units=metric`
      );

      let jsonResponse = await response.json();
      let result = {
        temp: jsonResponse.main.temp,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        city: jsonResponse.name,
        country: jsonResponse.sys.country,
        weatherCondition: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (error) {
      throw err;
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();

      if (newInfo) {
        updateInfo(newInfo);
        setError(false);
      } else {
        console.log("City not found or an error occurred.");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className="SearchBar">
        <div className="SearchBox">
          <form onSubmit={handleSubmit} className="form">
            <div className="form_content">
              <TextField
                id="city"
                label="City Name"
                variant="outlined"
                required
                value={city}
                onChange={handleChange}
                className="textField"
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                type="submit"
                endIcon={<SearchIcon />}
                className="submitButton"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        {error && (
          <div className="ErrorBox">
            <Alert variant="outlined" severity="error">
              No Such Place Exists!
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}
