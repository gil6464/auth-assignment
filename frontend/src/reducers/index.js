import { combineReducers } from "redux";
import isLogged from "./isLogged";
import userId from "./userId";

const rootReducer = combineReducers({
  isLogged,
  userId,
});

export default rootReducer;
