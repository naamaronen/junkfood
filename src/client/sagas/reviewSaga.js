import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_REVIEW,
  TIME_SORT,
  FIELD_SORT,
  DELETE_REVIEW,
  UPDATE_REVIEW
} from "../actions/types";
import {
  addReviewSuccess,
  reviewsFailure,
  sortSuccsses
} from "../actions/reviewAction";
import { refresh } from "../actions/userActions";

function* saveReview(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      body: action.payload
    });
    const reviewRes = yield call([res, "json"]);
    let username = { username: action.payload.get("user") };
    reviewRes.review.user = username;
    yield put(refresh(username));
    yield put(addReviewSuccess(reviewRes));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

function* sort(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });
    const reviews = yield call([res, "json"]);
    yield put(sortSuccsses(reviews));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

function* deleteReview(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "DELETE"
    });
    yield put(refresh({ username: action.payload.get("user") }));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* ReviewSaga() {
  yield takeEvery([ADD_REVIEW, UPDATE_REVIEW], saveReview);
  yield takeEvery([TIME_SORT, FIELD_SORT], sort);
  yield takeEvery(DELETE_REVIEW, deleteReview);
}
