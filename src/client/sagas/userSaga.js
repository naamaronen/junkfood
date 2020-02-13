import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN, UPDATE_USER } from "../actions/types";
import { userProfileSuccsses } from "../actions/userActions.js";
import { returnErrors } from "../actions/errorActions";

function* login(action) {
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
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "api/register/update", options);
    const user = yield call([res, "json"]);
    yield put(userProfileSuccsses(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* UserSaga() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(UPDATE_USER, updateProfile);
}
