import { LOGIN, LOGOUT } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
