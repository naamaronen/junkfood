import {
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  REVIEWS_FAILURE,
  USER_FAILURE,
  GET_USER_SUCCESS
} from "./types";

export function addReview(review) {
  return {
    type: ADD_REVIEW,
    payload: review,
    uri: "api/reviews"
  };
}

export function addReviewSuccess(review) {
  return { type: ADD_REVIEW_SUCCESS, payload: review };
}

export function reviewsFailure(error) {
  return { type: REVIEWS_FAILURE, error };
}

export function getUserSuccess(user) {
  return { type: GET_USER_SUCCESS, payload: user };
}

export function getUserFailure(error) {
  return { type: USER_FAILURE, error };
}
