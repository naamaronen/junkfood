import { USER_PROFILE_SUCCSSES, UPDATE_USER, UPLOAD_PIC } from "./types";

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

export function uploadPicture(picture) {
  return {
    type: UPLOAD_PIC,
    payload: picture
  };
}
