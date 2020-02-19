import {
  USER_PROFILE_SUCCSSES,
  UPDATE_USER,
  REFRESH,
  OTHER_PROFILE,
  OTHER_PROFILE_SUCCSSES,
  LOADED_USERS,
  FETCH_USERS
} from "./types";

export function userProfileSuccsses(user) {
  return {
    type: USER_PROFILE_SUCCSSES,
    payload: user
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

export function getUserProfile(user) {
  return {
    type: OTHER_PROFILE,
    payload: user,
    uri: "api/users/getProfile"
  };
}

export function otherProfileSuccsses(user) {
  return {
    type: OTHER_PROFILE_SUCCSSES,
    payload: user
  };
}

export function loadedUsers(users) {
  return { type: LOADED_USERS, payload: users };
}

export function fetchUsers() {
  return { type: FETCH_USERS, uri: "api/users/fetch" };
}
