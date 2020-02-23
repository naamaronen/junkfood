import {
  ADD_REST,
  DELETE_REST,
  ADD_REST_SUCCESS,
  RESTS_FAILURE,
  LOADED_RESTS,
  FETCH_RESTS,
  WATCH_REVIEWS,
  REVIEWS_SUCCESS,
  REVIEWS_FAILURE,
  GET_REST,
  GET_REST_SUCCSSES, CLEAR_SUCCESS_STATUS
} from "./types";

export function getRestaurants() {
  return {
    type: FETCH_RESTS,
    uri: "api/restaurants"
  };
}

export function deleteRestaurant(id) {
  return {
    type: DELETE_REST,
    payload: id
  };
}

export function addRest(restaurant) {
  return {
    type: ADD_REST,
    payload: restaurant,
    uri: "api/restaurants"
  };
}

export function addRestSuccess(restaurant) {
  return { type: ADD_REST_SUCCESS, payload: restaurant };
}

export function restsFailure(error) {
  return { type: RESTS_FAILURE, error:error };
}

export function loadedRests(restaurants) {
  return { type: LOADED_RESTS, payload: restaurants };
}

export function fetchRests() {
  return { type: FETCH_RESTS, uri: "api/restaurants" };
}

export function reviewsSuccsses(restaurant) {
  return { type: REVIEWS_SUCCESS, payload: restaurant };
}

export function reviewsFailure(error) {
  return { type: REVIEWS_FAILURE, error };
}

export function getRest(restaurant) {
  return { type: GET_REST, uri: "api/restaurant/reviews", payload: restaurant };
}

export function getRestSuccsses(restaurant) {
  return { type: GET_REST_SUCCSSES, payload: restaurant };
}

export function clearRestSuccessStatus() {
  return {
    type: CLEAR_SUCCESS_STATUS
  };
}