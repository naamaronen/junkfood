import {
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  REVIEWS_FAILURE,
  USER_FAILURE,
  GET_USER_SUCCESS,
  SORT_SUCCSSES
} from "../actions/types";

const initialState = {
  reviews: [],
  loading: false,
  saving: false,
  error: "",
  token: localStorage.getItem("token"),
  sortedReviews: []
};

//check the get method, instead of action.payload maybe use "get" function
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return { ...state, saving: true };

    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.concat(action.payload),
        saving: false
      };

    case REVIEWS_FAILURE:
      return { ...state, loading: false, saving: false, error: action.error };

    case GET_USER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        saving: false
      };

    case USER_FAILURE:
      return { ...state, loading: false, saving: false, error: action.error };

    case SORT_SUCCSSES:
      state.sortedReviews = [];
      console.log(action.payload);
      return {
        ...state,
        sortedReviews: state.sortedReviews.concat(action.payload)
      };

    default:
      return state;
  }
}
