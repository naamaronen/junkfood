import { USER_PROFILE_SUCCSSES } from "../actions/types";

const initialState = {
  userProfile: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCSSES:
      return { ...state, userProfile: action.payload };

    default:
      return state;
  }
}
