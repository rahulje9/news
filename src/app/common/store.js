import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import newsReducer from "../ducks/news";
import weatherReducer from "../ducks/weather";

const rootPersistConfig = {
  key: "news",
  storage: storage,
};

const getPersistConfig = (key, blacklist) => {
  return {
    key: key,
    blacklist: blacklist,
    storage: storage,
  };
};

const rootReducer = combineReducers({
  weatherReducer: persistReducer(
    getPersistConfig("weatherReducer", []),
    weatherReducer
  ),
  newsReducer: persistReducer(
    getPersistConfig("newsReducer", ["newsDetails"]),
    newsReducer
  ),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(persistedReducer, initialState, enhancer);
}

const store = configureStore({});
const persistor = persistStore(store);

export { store, persistor };
