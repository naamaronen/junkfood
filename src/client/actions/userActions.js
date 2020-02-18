import {
  USER_PROFILE_SUCCSSES,
  UPDATE_USER,
  UPLOAD_PIC,
  REFRESH
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
