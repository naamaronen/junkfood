import {
  USER_PROFILE_SUCCSSES,
  UPDATE_USER,
  UPLOAD_PIC,
  REFRESH,
  OTHER_PROFILE,
  OTHER_PROFILE_SUCCSSES
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

export function uploadPicture(picture) {
  return {
    type: UPLOAD_PIC,
    payload: picture
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
