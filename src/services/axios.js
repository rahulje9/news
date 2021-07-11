import axios from "axios";
import { OPEN_WEATHER_MAP_BASE_URL } from "../constants/url";

// axios instance for weather
export const axiosWeatherInstance = axios.create({
  baseURL: OPEN_WEATHER_MAP_BASE_URL,
  timeout: 2500,
});

const handleRequest = (config) => config;

const handleError = (error) => {
  let parsed_error = Object.assign({}, error);
  return Promise.reject(parsed_error);
};

const handleResponse = (response) => Promise.resolve(response?.data);

axiosWeatherInstance.interceptors.request.use(handleRequest);
axiosWeatherInstance.interceptors.response.use(handleResponse, handleError);
