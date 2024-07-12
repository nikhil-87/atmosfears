import { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import SearchBar from "./SearchBar";
import CycloneRoundedIcon from "@mui/icons-material/CycloneRounded";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({});

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const backgroundImageUrl =
    'url("https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';

  return (
    <div
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <h1>
        <CycloneRoundedIcon />
        &nbsp;AtmosFears
      </h1>
      <br></br>
      <p>Discover the current weather at your fingertips.</p>
      <br></br>
      <br></br>
      <SearchBar updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
