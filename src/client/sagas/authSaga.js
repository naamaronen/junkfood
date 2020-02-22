import { call, put, takeEvery } from "redux-saga/effects";
import { REGISTER, USER_LOADING, LOGIN, LOGOUT } from "../actions/types";
import {
  registerSuccsses,
  registerFail,
  loginSuccsses,
  loginFail,
} from "../actions/authActions";
import { getUserSuccess } from "../actions/reviewAction";
import { returnErrors } from "../actions/errorActions";
import {userProfileSuccsses} from "../actions/userActions";

function* register(action) {
  try {
    const options = {
      method: "POST",
      body: action.payload
    };

    const res = yield call(fetch, action.uri, options);
    const reply = yield res.json();
    if (reply.success){
      yield put(registerSuccsses(reply.user));
      yield put(userProfileSuccsses(reply.user));
    } else {
      yield put(registerFail(reply.msg));
      yield put(returnErrors(reply));
    }
  } catch (e) {
    yield put(registerFail(e.message));
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
    const reply = yield call([res, "json"]);
    console.log(reply);
    if (reply.success) {
      yield put(loginSuccsses(reply));
      //yield put(getUserSuccess(reply));
    }
    else{
      yield put(loginFail(reply));
      yield put(returnErrors(reply));
    }
  } catch (e) {
    yield put(loginFail(e.message));
    yield put(returnErrors(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* AuthSaga() {
  yield takeEvery(REGISTER, register);
  yield takeEvery(LOGIN, login);
}
