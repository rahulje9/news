import { pick } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/header/Header";
import NewsCard from "../components/newsCard/NewsCard";
import WeatherCard from "../components/weatherCard/WeatherCard";
import { getWeatherDetails } from "../ducks/weather";
import useNewsFetch from "../hooks/useNewsFetch";
// import styles from "../styles/home.css";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
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
  const observer = useRef();

  weatherDetailsRef.current = weatherDetails;
  weatherDetailsSuccessRef.current = weatherDetailsSuccess;
  weatherDetailsErrorRef.current = weatherDetailsError;

  const { data, loading, hasMore, error } = useNewsFetch(
    weatherData?.sys?.country,
    pageNumber
  );

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // fetch location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 10000,
      });
    }
  }, []);

  // fetch weather
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
      <Header />
      <WeatherCard data={weatherData} />
      {data?.length
        ? data.map((item, index) => {
            return (
              <div key={index}>
                {data.length === index + 1 ? (
                  <NewsCard
                    data={item}
                    index={index}
                    reference={lastElementRef}
                  />
                ) : (
                  <NewsCard data={item} index={index} />
                )}
              </div>
            );
          })
        : null}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
