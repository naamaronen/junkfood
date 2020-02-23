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
  getRestSuccsses
} from "../actions/restaurantAction";
import {getGeoLocation} from "../helpFunctions";

function* getAllRestaurants() {
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
  let rest = action.payload;
  const geolocation = yield call(getGeoLocation, rest.location);
  rest.geolocation = JSON.stringify(geolocation);
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rest)
    });
    const reply = yield call([res, "json"]);
    if (reply.success) {
      yield put(addRestSuccess(reply.restaurant));
    } else {
      yield put(restsFailure(reply.msg));
    }
  } catch (e) {
    yield put(restsFailure(e.message));
  }
}

function* getRest(action) {
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
  yield takeEvery(ADD_REST, saveRest);
  yield takeEvery(GET_REST, getRest);
}
