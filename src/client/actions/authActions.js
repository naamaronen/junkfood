import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  REGISTER,
  LOGIN,
  LOGOUT
} from "./types";

//Register User
export function register(user) {
  return {
    type: REGISTER,
    payload: user,
    uri: "/api/register"
  };
}
//Register Succsses
export function registerSuccsses(user) {
  return { type: REGISTER_SUCCESS, payload: user };
}

//Register Fail
export function registerFail(error) {
  return { type: REGISTER_FAIL, error };
}

//Login user
export function login(user) {
  return {
    type: LOGIN,
    payload: user,
    uri: "api/signin"
  };
}

//Login Succsses
export function loginSuccsses(user) {
  return { type: LOGIN_SUCCESS, payload: user };
}

//Login Fail
export function loginFail(error) {
  return { type: LOGIN_FAIL, payload: error };
}

//Logout user
export function logout(username) {
  return { type: LOGOUT, payload: username};
}

