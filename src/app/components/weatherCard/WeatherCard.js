import React from "react";
import * as Bootstrap from "react-bootstrap";
import { WEATHER_ICON } from "../../constants/urls";
import "./styles.css";

const WeatherCard = ({ data }) => {
  //   console.log("data", data?.weather?.icon);
  const getWeatherIcon = () =>
    `${WEATHER_ICON}${data?.weather?.icon ?? "10d"}.png`;

  console.log("getWeatherIcon", getWeatherIcon());
  return (
    <div className="weather-card-container">
      <Bootstrap.Card className="custom-card" onClick={() => {}}>
        <Bootstrap.Image src={getWeatherIcon} rounded />

        <Bootstrap.Card.Body>
          {/* <Bootstrap.Card.Title>{data?.title}</Bootstrap.Card.Title> */}
          {/* <Bootstrap.Card.Text>{data?.description}</Bootstrap.Card.Text> */}
        </Bootstrap.Card.Body>
      </Bootstrap.Card>
    </div>
  );
};

export default WeatherCard;
