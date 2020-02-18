import { call, put, takeEvery } from "redux-saga/effects";
import { REGISTER, USER_LOADING, LOGIN, LOGOUT } from "../actions/types";
import {
  registerSuccsses,
  registerFail,
  userLoaded,
  loginSuccsses,
  loginFail,
  logoutSuccsses
} from "../actions/authActions";
import { getUserSuccess } from "../actions/reviewAction";
import { returnErrors } from "../actions/errorActions";

function* register(action) {
  try {
    const options = {
      method: "POST",
      body: action.payload
    };

    const res = yield call(fetch, action.uri, options);
    const user = yield res.json();
    yield put(registerSuccsses(user));
  } catch (e) {
    yield put(registerFail(e.message));
  }
}

function* loadUser(action) {
  try {
    const res = yield call(fetch, action.uri, tokenConfig(action.payload), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const user = yield res.json();
    yield put(userLoaded(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

function* login(action) {
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
    console.log(user);
    yield put(loginSuccsses(user));
    yield put(getUserSuccess(user));
  } catch (e) {
    yield put(loginFail(e.message));
    yield put(returnErrors(e.message));
  }
}

function* logout(action) {
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
    yield put(logoutSuccsses(user));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* AuthSaga() {
  yield takeEvery(USER_LOADING, loadUser);
  yield takeEvery(REGISTER, register);
  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGOUT, logout);
}
