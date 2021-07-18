import moment from "moment";
import React from "react";
import * as Bootstrap from "react-bootstrap";
import { WEATHER_ICON } from "../../constants/urls";
import "./styles.css";

const WeatherCard = ({ data }) => {
  const getWeatherIcon = () =>
    `${WEATHER_ICON}${data?.weather[0]?.icon ?? "10d"}.png`;

  return data ? (
    <div className="weather-card-container">
      <Bootstrap.Card className="weather-custom-card">
        <div className="card-row">
          <Bootstrap.Card.Body>
            <div className="icon-temp">
              <Bootstrap.Image src={getWeatherIcon()} rounded />
              <Bootstrap.Card.Title className="temp">
                {(data?.main?.temp ? Math.round(data?.main?.temp) : 0) + "°"}
              </Bootstrap.Card.Title>
            </div>
            <Bootstrap.Card.Title>
              {data?.weather[0]?.description}
            </Bootstrap.Card.Title>
          </Bootstrap.Card.Body>
          <div className="country">
            <Bootstrap.Card.Body>
              <Bootstrap.Card.Title>
                {data?.name + "," + data?.sys?.country}
              </Bootstrap.Card.Title>
              <Bootstrap.Card.Title className="temp">
                {moment().format("MMM Do YY")}
              </Bootstrap.Card.Title>
            </Bootstrap.Card.Body>
          </div>
        </div>
      </Bootstrap.Card>
    </div>
  ) : null;
};

export default WeatherCard;
