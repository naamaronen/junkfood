import {
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  REVIEWS_FAILURE,
  USER_FAILURE,
  GET_USER_SUCCESS,
  TIME_SORT,
  FIELD_SORT,
  SORT_SUCCSSES,
  DELETE_REVIEW,
  UPDATE_REVIEW
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

export function sortByDate(sort) {
  return { type: TIME_SORT, payload: sort, uri: "api/reviews/time_sort" };
}

export function sortByField(sort) {
  return { type: FIELD_SORT, payload: sort, uri: "api/reviews/field_sort" };
}

export function sortSuccsses(sort) {
  return { type: SORT_SUCCSSES, payload: sort };
}

export function deleteReview(id) {
  return { type: DELETE_REVIEW, payload: id, uri: `api/reviews/${id}` };
}

export function updateReview(review) {
  return { type: UPDATE_REVIEW, payload: review, uri: "api/reviews/update" };
}
