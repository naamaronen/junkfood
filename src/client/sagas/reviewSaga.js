import { call, put, takeEvery } from "redux-saga/effects";
import { ADD_REVIEW } from "../actions/types";
import { addReviewSuccess, reviewsFailure } from "../actions/reviewAction";

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
    yield put(addReviewSuccess(review));
  } catch (e) {
    yield put(reviewsFailure(e.message));
  }
}

//using takeEvery, you take the action away from reducer to saga
export default function* ReviewSaga() {
  yield takeEvery(ADD_REVIEW, saveReview);
}
