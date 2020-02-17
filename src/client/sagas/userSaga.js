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
  console.log(action.payload);
  try {
    const options = {
      method: "POST",
<<<<<<< HEAD
      body: JSON.stringify(action.payload)
=======
      body: action.payload
>>>>>>> 588ee5098e9f7c28da4d3cdcdeec24e452a4e3f9
      /*headers: new Headers({
        "Content-Type": "application/json"
      })*/
    };
    const res = yield call(fetch, "api/image", options);
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
