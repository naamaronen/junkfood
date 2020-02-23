import {
  USER_PROFILE_SUCCSSES,
  UPDATE_USER,
  REFRESH,
  LOADED_USERS,
  FETCH_USERS,
  USER_GEO_LOCATION
} from "./types";

export function userProfileSuccsses(user) {
  return {
    type: USER_PROFILE_SUCCSSES,
    payload: user
  };
}

export function updateUserGeoLocation(position) {
  return {
    type: USER_GEO_LOCATION,
    payload: position.coords
  };
}

export function updateProfile(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

export function refresh(user) {
  return {
    type: REFRESH,
    payload: user
  };
}

export function loadedUsers(users) {
  return { type: LOADED_USERS, payload: users };
}

export function fetchUsers() {
  return { type: FETCH_USERS, uri: "api/users/fetch" };
}
