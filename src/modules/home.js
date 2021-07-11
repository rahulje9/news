import { pick } from "lodash";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getWeatherDetails } from "../ducks/weather";

const Home = () => {
  const dispatch = useDispatch();
  const [currentLocation, setcurrentLocation] = useState(null);
  const [weatherData, setweatherData] = useState(null);

  const weatherDetails = useSelector(
    (state) => state?.weatherReducer?.weatherDetails
  );
  const weatherDetailsSuccess = useSelector(
    (state) => state?.weatherReducer?.weatherDetailsSuccess
  );
  const weatherDetailsError = useSelector(
    (state) => state?.weatherReducer?.weatherDetailsError
  );

  const weatherDetailsRef = useRef();
  const weatherDetailsSuccessRef = useRef();
  const weatherDetailsErrorRef = useRef();

  weatherDetailsRef.current = weatherDetails;
  weatherDetailsSuccessRef.current = weatherDetailsSuccess;
  weatherDetailsErrorRef.current = weatherDetailsError;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
      });
    }
  }, []);

  useEffect(() => {
    if (currentLocation) {
      dispatch(getWeatherDetails(currentLocation)).then(() => {
        setweatherData(weatherDetailsRef.current);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  const successCallback = (data) => {
    const location = pick(data?.coords, ["latitude", "longitude"]);
    setcurrentLocation(location);
  };

  const errorCallback = (error) => {
    toast.error("oh no!, you must allow location access to continue", {
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  return (
    <>
      {console.log("{weatherData}", weatherData)}
      <span>Home</span>
      <p>weather :{weatherData?.main?.temp} </p>
    </>
  );
};

export default Home;
