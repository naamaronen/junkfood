import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN,
  UPDATE_USER,
  REFRESH,
  OTHER_PROFILE,
  FETCH_USERS
} from "../actions/types";
import {
  userProfileSuccsses,
  refresh,
  otherProfileSuccsses,
  loadedUsers
} from "../actions/userActions.js";
import { returnErrors } from "../actions/errorActions";
import {getGeoLocation} from "../helpFunctions";


function* getUser(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "api/signin/userSessions", options);
    const user = yield call([res, "json"]);

    yield put(userProfileSuccsses(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}


function* updateProfile(action) {
  let user = action.payload;
  const geolocation = yield call(getGeoLocation, user.get("location"));
  user.append("geoLocation",JSON.stringify(geolocation));
  try {
    const options = {
      method: "POST",
      body: user
    };
    const res = yield call(fetch, "api/register/update", options);
    const reply = yield call([res, "json"]);

    if (reply.success) {
      console.log("suc");
      console.log(reply.user);
      yield put(userProfileSuccsses(reply.user));
      yield put(refresh(reply.user));
    } else {
      yield put(returnErrors(reply));
    }
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

function* otherProfile(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    console.log(action.payload);
    const res = yield call(fetch, action.uri, options);
    const user = yield call([res, "json"]);
    yield put(otherProfileSuccsses(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

function* getAllUsers(action) {
  console.log("get all users");
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const users = yield call([res, "json"]);
    yield put(loadedUsers(users));
  } catch (e) {
    console.log(e);
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* UserSaga() {
  yield takeEvery(LOGIN, getUser);
  yield takeEvery(REFRESH, getUser);
  yield takeEvery(UPDATE_USER, updateProfile);
  yield takeEvery(OTHER_PROFILE, otherProfile);
  yield takeEvery(FETCH_USERS, getAllUsers);
}
