import { LOAD_SEARCH } from "../actions/types";

const initialState = {
  searchResult: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH:
      return {
        ...state,
        searchResult: action.payload
      };

    default:
      return state;
  }
}
