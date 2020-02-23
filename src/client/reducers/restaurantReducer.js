import {
  ADD_REST,
  DELETE_REST,
  ADD_REST_SUCCESS,
  RESTS_FAILURE,
  LOADED_RESTS,
  FETCH_RESTS,
  WATCH_REVIEWS,
  REVIEWS_SUCCESS,
  REVIEWS_FAILURE,
  GET_REST_SUCCSSES,
  CLEAR_SUCCESS_STATUS
} from "../actions/types";

const initialState = {
  restaurants: [],
  loading: false,
  saving: false,
  error: "",
  addSuccess: false,
  rest: null
};

//check the get method, instead of action.payload maybe use "get" function
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADED_RESTS:
      return {
        ...state,
        restaurants: action.payload,
        error: "",
        loading: false
      };

    case FETCH_RESTS: {
      return { ...state, loading: true };
    }
    case ADD_REST:
      return { ...state, saving: true };

    case ADD_REST_SUCCESS:
      return {
        ...state,
        error: "",
        addSuccess: true,
        restaurants: state.restaurants.concat(action.payload),
        saving: false
      };

    case RESTS_FAILURE:
      return { ...state, loading: false, saving: false, error: action.error,
        addSuccess: false};

    case DELETE_REST:
      return {
        ...state,
        error: "",
        restaurants: state.restaurants.reduce(
          (restaurants, restaurant) =>
            restaurant._id !== action.payload
              ? restaurants.concat(restaurant)
              : restaurants,
          []
        )
      };

    case REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload.reviews,
        addSuccess: true,
        loading: false
      };

    case REVIEWS_FAILURE:
      return { ...state, loading: false, saving: false, addSuccess: false, error: action.error };

    case GET_REST_SUCCSSES: {
      let rest = action.payload;
      rest.geolocation = rest.geolocation? JSON.parse(rest.geolocation) : null;
      console.log("hi3");
      return {
        ...state,
        error: "",
        rest: rest
      }
    }

    case CLEAR_SUCCESS_STATUS:
      return {...state, error:"", addSuccess: false};

    default:
      return state;
  }
}
