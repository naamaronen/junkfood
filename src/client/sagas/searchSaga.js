import { call, put, takeEvery } from "redux-saga/effects";
import { SEARCH_REST, SEARCH_USER } from "../actions/types";
import { loadSearch } from "../actions/searchActions.js";
import { returnErrors } from "../actions/errorActions";

function* searchRest(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "api/search_rest", options);
    const ress = yield call([res, "json"]);
    ress.map((rest)=>{
      rest.geolocation? (rest.geolocation=JSON.parse(rest.geolocation)) : null;
    })
    //
    yield put(loadSearch(ress));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

function* searchUser(action) {
  console.log(`action = ${action}`);
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "api/search_user", options);
    const ress = yield call([res, "json"]);
    console.log(`result = ${ress}`);
    yield put(loadSearch(ress));
  } catch (e) {
    yield put(returnErrors(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* UserSaga() {
  yield takeEvery(SEARCH_REST, searchRest);
  yield takeEvery(SEARCH_USER, searchUser);
}
