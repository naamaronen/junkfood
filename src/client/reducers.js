import { combineReducers } from "redux";
import restaurantReducer from "./reducers/restaurantReducer";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";
import reviewReducer from "./reducers/reviewReducer";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";

export default combineReducers({
  restaurant: restaurantReducer,
  error: errorReducer,
  auth: authReducer,
  review: reviewReducer,
  user: userReducer,
  search: searchReducer
});
