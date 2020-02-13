import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//RETURN ERRORS
export function returnErrors(error) {
  return {
    type: GET_ERRORS,
    payload: error
  };
}

//CLEAR_ERRORS
export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
