import axios from "axios";
import { NEWS_KEY } from "../constants/constants";
import {
  NEWS_API_BASE_URL,
  OPEN_WEATHER_MAP_BASE_URL,
} from "../constants/urls";

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

// axios instance for news
export const axiosNewsInstance = axios.create({
  baseURL: NEWS_API_BASE_URL,
  timeout: 2500,
  headers: {
    "X-Api-Key": NEWS_KEY,
  },
});

axiosNewsInstance.interceptors.request.use(handleRequest);
axiosNewsInstance.interceptors.response.use(handleResponse, handleError);
