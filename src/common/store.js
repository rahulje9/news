import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";

const AppReducer = combineReducers({});

const persistConfig = {
  key: "news",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(persistedReducer, initialState, enhancer); //Creating store file with reducer and thunk middleware
}

const store = configureStore({});
const persistor = persistStore(store);

export { store, persistor };