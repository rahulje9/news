import { getWeatherDetailsAPI } from "../services/api";

const FETCH_WEATHER_SUCCESS = "ducks/weather/FETCH_WEATHER_SUCCESS";
const FETCH_WEATHER_ERROR = "ducks/weather/FETCH_WEATHER_ERROR";

const initialState = {
  weatherDetails: null,
  weatherDetailsSuccess: false,
  weatherDetailsError: null,
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS: {
      return {
        ...state,
        weatherDetails: action.payload,
        weatherDetailsSuccess: true,
        weatherDetailsError: null,
      };
    }
    case FETCH_WEATHER_ERROR: {
      return {
        ...state,
        weatherDetailsSuccess: false,
        weatherDetailsError: action.payload,
      };
    }
    default:
      return state;
  }
}

export const getWeatherDetails = (data) => {
  return (dispatch) => {
    return getWeatherDetailsAPI(data)
      .then((res) => {
        dispatch(getWeatherDetailsSuccess(res));
      })
      .catch((err) => {
        dispatch(getWeatherDetailsError(err));
      });
  };
};

export const getWeatherDetailsSuccess = (data) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: data,
  };
};

export const getWeatherDetailsError = (data) => {
  return {
    type: FETCH_WEATHER_ERROR,
    payload: data,
  };
};
