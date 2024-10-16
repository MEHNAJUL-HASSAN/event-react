import { createStore, combineReducers } from "redux";
import eventReducer from "./reducers/eventReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  events: eventReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
