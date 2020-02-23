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
  console.log("saveReviewSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      body: action.payload
    });
    const review = yield call([res, "json"]);
    console.log(review);
    yield put(refresh({ username: action.payload.get("user") }));
    yield put(addReviewSuccess(review));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

function* sort(action) {
  console.log("sortTimeReviewSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });
    const reviews = yield call([res, "json"]);
    console.log(reviews);
    yield put(sortSuccsses(reviews));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

function* deleteReview(action) {
  console.log("deleteReviewSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "DELETE"
    });
    yield put(refresh({ username: action.payload.get("user") }));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

/*
function* updateReview(action) {
  console.log("updateReviewSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });
    const review = yield call([res, "json"]);
    console.log(review);
    yield put(refresh({ username: action.payload.user }));
    //yield put(addReviewSuccess(review));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}*/

//using takeEvery, you take the action away from reducer to saga
export default function* ReviewSaga() {
  yield takeEvery([ADD_REVIEW, UPDATE_REVIEW], saveReview);
  yield takeEvery([TIME_SORT, FIELD_SORT], sort);
  yield takeEvery(DELETE_REVIEW, deleteReview);
  //yield takeEvery(UPDATE_REVIEW, updateReview);
}
