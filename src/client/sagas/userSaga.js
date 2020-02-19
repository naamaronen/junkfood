import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN,
  UPDATE_USER,
  REGISTER,
  REFRESH,
  OTHER_PROFILE
} from "../actions/types";
import {
  userProfileSuccsses,
  refresh,
  otherProfileSuccsses
} from "../actions/userActions.js";
import { returnErrors } from "../actions/errorActions";

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
  console.log(action.payload);
  try {
    const options = {
      method: "POST",
      body: action.payload
    };
    const res = yield call(fetch, "api/register/update", options);
    const user = yield call([res, "json"]);
    yield put(userProfileSuccsses(user));
    yield put(refresh(user));
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
    const res = yield call(fetch, action.uri, options);
    const user = yield call([res, "json"]);
    yield put(otherProfileSuccsses(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* UserSaga() {
  yield takeEvery(LOGIN, getUser);
  yield takeEvery(REGISTER, getUser);
  yield takeEvery(REFRESH, getUser);
  yield takeEvery(UPDATE_USER, updateProfile);
  yield takeEvery(OTHER_PROFILE, otherProfile);
}
