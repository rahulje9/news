import { WEATHER_KEY } from "../constants/constants";
import { axiosNewsInstance, axiosWeatherInstance } from "./axios";

export const getWeatherDetailsAPI = (data) =>
  axiosWeatherInstance.get(
    `weather?lat=${data?.latitude}&lon=${data?.longitude}&appid=${WEATHER_KEY}&units=metric`
  );

export const getNewsAPI = (country, page = 1) =>
  axiosNewsInstance.get(`top-headlines?country=${country}&page=${page}`);
