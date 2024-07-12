import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Import other weather icons as needed
import WbCloudyRoundedIcon from "@mui/icons-material/WbCloudyRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import AirRoundedIcon from "@mui/icons-material/Air";
import TornadoRoundedIcon from "@mui/icons-material/TornadoRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";

import useUnsplashImage from "./useUnsplashImage"; // Import the custom hook
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const INIT_URL =
    "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682465_CBq4AWAFmFT1otwioF5X327rCjkVICyH.jpg";

  const imageUrl = useUnsplashImage(info.weatherCondition); // Fetch image based on weather condition

  let weatherIcon;

  // Determine weather based on available data
  // if (info.humidity > 80) {
  //   weatherIcon = <ThunderstormRoundedIcon />;
  // } else if (info.temp > 25 && info.cloud < 50) {
  //   weatherIcon = <WbSunnyRoundedIcon />;
  // } else if (info.temp > 15 && info.cloud >= 50) {
  //   weatherIcon = <WbCloudyRoundedIcon />;
  // } else if (info.temp < 5) {
  //   weatherIcon = <AcUnitRoundedIcon />;
  // } else if (info.temp > 5 && info.temp < 15) {
  //   weatherIcon = <CloudQueueRoundedIcon />;
  // } else if (info.temp > 15 && info.temp < 25) {
  //   weatherIcon = <WaterRoundedIcon />;
  // } else if (info.temp > 25) {
  //   weatherIcon = <AirRoundedIcon />;
  // } else {
  //   weatherIcon = <TornadoRoundedIcon />;
  // }

  //info.weatherMain  have a range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.
  if (info.weatherMain === "Thunderstorm") {
    weatherIcon = <ThunderstormRoundedIcon />;
  } else if (info.weatherMain === "Drizzle" || info.weatherMain === "Rain") {
    weatherIcon = <WaterRoundedIcon />;
  } else if (info.weatherMain === "Snow") {
    weatherIcon = <AcUnitRoundedIcon />;
  } else if (info.weatherMain === "Clear") {
    if (info.temp > 25) {
      weatherIcon = <WbSunnyRoundedIcon />;
    } else {
      weatherIcon = <WbCloudyRoundedIcon />;
    }
  } else if (info.weatherMain === "Clouds") {
    if (info.temp < 5) {
      weatherIcon = <AcUnitRoundedIcon />;
    } else if (info.temp >= 5 && info.temp < 15) {
      weatherIcon = <CloudQueueRoundedIcon />;
    } else if (info.temp >= 15 && info.temp < 25) {
      weatherIcon = <WaterRoundedIcon />;
    } else {
      weatherIcon = <AirRoundedIcon />;
    }
  } else {
    // Handle other weather categories like "Atmosphere", etc.
    weatherIcon = <TornadoRoundedIcon />;
  }

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={imageUrl || INIT_URL} // Use the fetched image or the initial URL as a fallback
            title={info.weatherCondition}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city ? (
                <div>
                  <p>
                    {`${info.city}, ${info.country} `}
                    <br></br>
                    <img src={`https://openweathermap.org/img/wn/${info.weather_icon}@2x.png`}></img>
                    {weatherIcon}
                  </p>
                </div>
              ) : (
                "Weather Info Unavailable"
              )}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component={"span"}
            >
              {info.city ? (
                <>
                  <p>Temperature = {info.temp}&deg;C</p>
                  <p>Humidity = {info.humidity}</p>
                  <p>Min Temp = {info.tempMin}&deg;C</p>
                  <p>Max Temp = {info.tempMax}&deg;C</p>
                  <p>
                    The Weather can be described as
                    <i>{info.weatherCondition}</i>and feels like{" "}
                    {info.feelsLike}&deg;C
                  </p>
                </>
              ) : (
                <p>
                  Grant location access to discover your city's weather or enter
                  your city's name for a search.
                </p>
              )}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
