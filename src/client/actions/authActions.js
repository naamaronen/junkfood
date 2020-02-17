import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER,
  LOGIN,
  LOGOUT
} from "./types";

//Check token & load user
export function loadUser(user) {
  //User loading
  return {
    type: USER_LOADING,
    payload: user,
    uri: "/api/register"
  };
}
export function userLoaded(user) {
  //User loading
  return {
    type: USER_LOADED,
    payload: user
  };
}

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
  return { type: LOGIN_FAIL, error };
}

//Logout user
export function logout(username) {
  return { type: LOGOUT, payload: username, uri: "api/signout/userSessions" };
}

//Logout Succsses
export function logoutSuccsses(user) {
  return { type: LOGOUT_SUCCESS, payload: user };
}
