import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN,
  UPDATE_USER,
  REGISTER,
  UPLOAD_PIC,
  ADD_REVIEW
} from "../actions/types";
import { userProfileSuccsses } from "../actions/userActions.js";
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

function* getUserAfterReview(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "api/signin/userSessionsReview", options);
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

function* uploadPicture(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload)
      /*headers: new Headers({
        "Content-Type": "application/json"
      })*/
    };
    const res = yield call(fetch, "api/upload", options);
    //const user = yield call([res, "json"]);
    //yield put(userProfileSuccsses(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* UserSaga() {
  yield takeEvery(LOGIN, getUser);
  yield takeEvery(REGISTER, getUser);
  yield takeEvery(ADD_REVIEW, getUserAfterReview);
  yield takeEvery(UPDATE_USER, updateProfile);
  yield takeEvery(UPLOAD_PIC, uploadPicture);
}
