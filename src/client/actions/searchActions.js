import { SEARCH_REST, SEARCH_USER, LOAD_SEARCH } from "./types";

export function searchByRest(search) {
  console.log(search);
  return {
    type: SEARCH_REST,
    payload: search
  };
}

export function searchByUser(search) {
  return {
    type: SEARCH_USER,
    payload: search
  };
}

export function loadSearch(res) {
  return {
    type: LOAD_SEARCH,
    payload: res
  };
}
