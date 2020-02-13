import { combineReducers } from "redux";
import GalleryReducer from "./components/Gallery/reducer";
import AppReducer from "./components/App/reducer";
import restaurantReducer from "./reducers/restaurantReducer";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";
import reviewReducer from "./reducers/reviewReducer";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";

export default combineReducers({
  //app: AppReducer,
  //gallery: GalleryReducer,
  restaurant: restaurantReducer,
  error: errorReducer,
  auth: authReducer,
  review: reviewReducer,
  user: userReducer,
  search: searchReducer
});
