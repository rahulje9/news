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
import * as Bootstrap from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [currentLocation, setcurrentLocation] = useState(null);
  const [weatherData, setweatherData] = useState(null);
  const [searchWord, setsearchWord] = useState("");
  const [newsData, setnewsData] = useState([]);

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

  useEffect(() => {
    generateFilteredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord, data]);

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

  const generateFilteredData = () => {
    const _data =
      searchWord?.trim()?.length !== 0
        ? data?.length
          ? data?.filter((item) => {
              return (
                item?.title
                  ?.toLowerCase()
                  ?.includes(searchWord?.toLowerCase()) && item
              );
            })
          : []
        : data;
    setnewsData(_data);
  };

  return (
    <>
      <Header />
      <WeatherCard data={weatherData} />

      {loading ? (
        <div className="loader">
          <Bootstrap.Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Bootstrap.Spinner>
        </div>
      ) : null}

      <Bootstrap.Card.Body className="home-label-card">
        <Bootstrap.InputGroup size="lg" style={{ width: "80%" }}>
          <Bootstrap.FormControl
            placeholder="Search latest News..."
            maxLength={40}
            value={searchWord}
            onChange={(e) => setsearchWord(e.target.value)}
          />
          <Bootstrap.Button
            onClick={() => {
              setsearchWord("");
            }}
            variant="outline-secondary"
            id="button-addon1"
          >
            Clear
          </Bootstrap.Button>
        </Bootstrap.InputGroup>
      </Bootstrap.Card.Body>

      {newsData?.length
        ? newsData?.map((item, index) => {
            return (
              <div key={index}>
                {newsData?.length === index + 1 ? (
                  <NewsCard
                    loading={loading}
                    data={item}
                    index={index}
                    reference={lastElementRef}
                  />
                ) : (
                  <NewsCard loading={loading} data={item} index={index} />
                )}
              </div>
            );
          })
        : null}
    </>
  );
};

export default Home;
