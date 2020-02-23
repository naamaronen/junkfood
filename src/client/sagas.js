import { all } from "redux-saga/effects";
import RestaurantSaga from "./sagas/restSaga";
import AuthSaga from "./sagas/authSaga";
import ReviewSaga from "./sagas/reviewSaga";
import UserSaga from "./sagas/userSaga";
import SearchSaga from "./sagas/searchSaga";

export default function* Sagas() {
  yield all([
    RestaurantSaga(),
    AuthSaga(),
    ReviewSaga(),
    UserSaga(),
    SearchSaga()
  ]);
}
