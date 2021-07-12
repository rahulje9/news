import { axiosWeatherInstance, axiosNewsInstance } from "./axios";
import { WEATHER_KEY, NEWS_KEY } from "../constants/constants";

export const getWeatherDetailsAPI = (data) =>
  axiosWeatherInstance.get(
    `weather?lat=${data?.latitude}&lon=${data?.longitude}&appid=${WEATHER_KEY}&units=metric`
  );

export const getNewsAPI = (country, page) =>
  axiosNewsInstance.get(`top-headlines?country=${country}`);
