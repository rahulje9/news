import { pick } from "lodash";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getWeatherDetails } from "../ducks/weather";
import { getNews } from "../ducks/news";
import useNewsFetch from "../hooks/useNewsFetch";
// import styles from "../styles/home.css";
import "../styles/home.css";
import Header from "../components/header/Header";
import NewsCard from "../components/newcard/NewsCard";

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
          console.log("setPageNumber", pageNumber);
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

  useEffect(() => {
    if (weatherData?.sys?.country) {
      // dispatch(getNews(weatherData?.sys?.country)).then(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData?.sys?.country]);

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
      <span>Home</span>
      <p>weather :{weatherData?.main?.temp} </p>
      {console.log("data", data)}

      {data.map((item, index) => {
        if (data.length === index + 1) {
          return (
            <NewsCard data={item} key={index} reference={lastElementRef} />
          );
        } else {
          return <NewsCard data={item} key={index} />;
          // <div key={index}>{item?.title}</div>;
        }
      })}
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
