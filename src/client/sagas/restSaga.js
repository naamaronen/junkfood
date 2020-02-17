import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_REST,
  DELETE_REST,
  FETCH_RESTS,
  WATCH_REVIEWS,
  GET_REST
} from "../actions/types";
import {
  loadedRests,
  restsFailure,
  addRestSuccess,
  reviewsSuccsses,
  reviewsFailure,
  getRestSuccsses
} from "../actions/restaurantAction";

function* getAllRestaurants() {
  console.log("get all restaurants");
  try {
    const res = yield call(fetch, "/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const rests = yield call([res, "json"]);
    yield put(loadedRests(rests));
  } catch (e) {
    yield put(restsFailure(e.message));
  }
}

function* saveRest(action) {
  console.log("addRestSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });
    const restaurant = yield call([res, "json"]);
    yield put(addRestSuccess(restaurant));
  } catch (e) {
    yield put(restsFailure(e.message));
  }
}

function* deleteRest(action) {
  try {
    yield call(fetch, `/api/restaurants/${action.payload}`, {
      method: "DELETE"
    });
  } catch (e) {
    yield put(restsFailure(e.message));
  }
}

function* watchReviews(action) {
  try {
    const res = yield call(fetch, action.uri, action.payload, {
      method: "GET"
    });
    console.log(res);
    const restaurant = yield call([res, "json"]);
    console.log(restaurant);
    yield put(reviewsSuccsses(restaurant));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

function* getRest(action) {
  console.log("getRestSaga=", action);
  console.log(action.payload);

  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });
    const restaurant = yield call([res, "json"]);
    yield put(getRestSuccsses(restaurant));
  } catch (e) {
    yield put(restsFailure(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* RestaurantSaga() {
  yield takeEvery(FETCH_RESTS, getAllRestaurants);
  //yield takeEvery(DELETE_REST, deleteRest);
  yield takeEvery(ADD_REST, saveRest);
  yield takeEvery(WATCH_REVIEWS, watchReviews);
  yield takeEvery(GET_REST, getRest);
}
