import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_REVIEW,
  TIME_SORT,
  FIELD_SORT,
  DELETE_REVIEW
} from "../actions/types";
import {
  addReviewSuccess,
  reviewsFailure,
  sortSuccsses
} from "../actions/reviewAction";
import { refresh } from "../actions/userActions";

function* saveReview(action) {
  console.log("addReviewSaga=", action);
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
    yield put(refresh({ username: action.payload.userReview }));
    yield put(addReviewSuccess(review));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

function* timeSort(action) {
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

function* fieldSort(action) {
  console.log("sortFieldReviewSaga=", action);
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
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* ReviewSaga() {
  yield takeEvery(ADD_REVIEW, saveReview);
  yield takeEvery(TIME_SORT, timeSort);
  yield takeEvery(FIELD_SORT, fieldSort);
  yield takeEvery(DELETE_REVIEW, deleteReview);
}
