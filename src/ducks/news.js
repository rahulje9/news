import { getNewsAPI } from "../services/api";

const FETCH_NEWS_SUCCESS = "ducks/weather/FETCH_NEWS_SUCCESS";
const FETCH_NEWS_ERROR = "ducks/weather/FETCH_NEWS_ERROR";

const initialState = {
  newsDetails: null,
  newsDetailsSuccess: false,
  newsDetailsError: null,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const getNews = (country, page) => {
  return (dispatch) => {
    return getNewsAPI(country, page)
      .then((res) => {
        console.log({ res });
        // dispatch(getWeatherDetailsSuccess(res));
      })
      .catch((err) => {
        console.log({ err });

        // dispatch(getWeatherDetailsError(err));
      });
  };
};

export const getWeatherDetailsSuccess = (data) => {};

export const getWeatherDetailsError = (data) => {};
