import { getNewsAPI } from "../services/api";

const FETCH_NEWS_SUCCESS = "ducks/news/FETCH_NEWS_SUCCESS";
const FETCH_NEWS_ERROR = "ducks/news/FETCH_NEWS_ERROR";

const initialState = {
  newsDetails: null,
  newsDetailsSuccess: false,
  newsDetailsError: null,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS: {
      return {
        ...state,
        newsDetails: action.payload,
        newsDetailsSuccess: true,
        newsDetailsError: null,
      };
    }
    case FETCH_NEWS_ERROR: {
      return {
        ...state,
        newsDetailsSuccess: false,
        newsDetailsError: action.payload,
      };
    }
    default:
      return state;
  }
}

export const getNews = (country, page) => {
  return (dispatch, getState) => {
    return getNewsAPI(country, page)
      .then((res) => {
        dispatch(getWeatherDetailsSuccess(res?.articles));
      })
      .catch((err) => {
        dispatch(getWeatherDetailsError(err));
      });
  };
};

export const getWeatherDetailsSuccess = (data) => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: data,
  };
};

export const getWeatherDetailsError = (err) => {
  return {
    type: FETCH_NEWS_ERROR,
    payload: err,
  };
};
