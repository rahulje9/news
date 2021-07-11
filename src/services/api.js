import { axiosWeatherInstance } from "./axios";
import { WEATHER_KEY } from "../constants/constants";

export const getWeatherDetailsAPI = (data) =>
  axiosWeatherInstance.get(
    `weather?lat=${data?.latitude}&lon=${data?.longitude}&appid=${WEATHER_KEY}&units=metric`
  );
