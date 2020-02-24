import {
  USER_PROFILE_SUCCSSES,
  OTHER_PROFILE_SUCCSSES,
  LOADED_USERS,
  LOGOUT
} from "../actions/types";


const initialState = {
  userProfile: null,
  otherUser: null,
  users: [],
  geoLocation: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCSSES:
      return { ...state, userProfile: action.payload, geoLocation: JSON.parse(action.payload.geolocation) };
    case LOGOUT:
      return {...state, userProfile: null, geoLocation: null }
    case OTHER_PROFILE_SUCCSSES:
      return { ...state, otherUser: action.payload };
    case LOADED_USERS:
      return {
        ...state,
        users: action.payload
      };

    default:
      return state;
  }
}
