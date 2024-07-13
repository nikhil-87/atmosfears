import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import useUnsplashImage from "./useUnsplashImage"; // Import the custom hook
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const INIT_URL =
    "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682465_CBq4AWAFmFT1otwioF5X327rCjkVICyH.jpg";

  const imageUrl = useUnsplashImage(info.weatherCondition); // Fetch image based on weather condition

  const styleColor = {
    Thunderstorm: "#F3E5F5", // Light Lavender
    Drizzle: "#E1F5FE", // Light Cyan
    Rain: "#E3F2FD", // Light Sky Blue
    Snow: "#FFFFFF", // Pure White
    Clouds: "#F5F5F5", // Very Light Gray
    Atmosphere: "#F0FFFF", // Light Azure
    Clear: "#FFF8E1", // Light Yellow (Lemon Chiffon)
  };

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
                    {`${info.city}${
                      info.country !== undefined ? ", " + info.country : ""
                    }`}
                  </p>
                </div>
              ) : (
                "Weather Info Unavailable"
              )}
            </Typography>
            <div
              style={{
                backgroundColor: styleColor[info.weatherMain],
                borderRadius: "0.5rem",
                border: "1px solid #EEEEEE",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                component={"span"}
              >
                {info.city ? (
                  <>
                    <img
                      src={`https://openweathermap.org/img/wn/${info.weatherIcon}@2x.png`}
                      width="50"
                      height="50"
                    ></img>
                    <p>Temperature = {info.temp}&deg;C</p>
                    <p>Humidity = {info.humidity}</p>
                    <p>Min Temp = {info.tempMin}&deg;C</p>
                    <p>Max Temp = {info.tempMax}&deg;C</p>
                    <p>
                      The Weather can be described as{" "}
                      <b>
                        <i>{info.weatherCondition}</i>
                      </b>{" "}
                      and feels like {info.feelsLike}&deg;C
                    </p>
                  </>
                ) : (
                  <p>
                    Grant location access to discover your city's weather or
                    enter your city's name for a search.
                  </p>
                )}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
