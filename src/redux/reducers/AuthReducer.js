// user management

export const IS_LOADING_AUTH = 'IS_LOADING_AUTH';
export const USER_DETAILS = 'USER_DETAILS';
export const USER_ID = 'USER_ID';
export const OTP_SEND = 'OTP_SEND';
export const Response_Status = 'Response_Status';
export const LOGIN = 'LOGIN';
export const SOCIAL_LOGIN_DETAILS = 'SOCIAL_LOGIN_DETAILS';
export const LOGOUT = 'LOGOUT';
const initial_state = {
  user: {},
  response_status: {},
  is_loading: false,
  otp: '',
  user_details: null,
  user_id: null,
  login: true,
  socialLoginDetail: null,
};

const AuthReducer = (state = initial_state, action) => {
  switch (action.type) {
    case IS_LOADING_AUTH:
      return {
        ...state,
        is_loading: action.payload,
      };

    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      };
    case OTP_SEND:
      return {
        ...state,
        otp: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case SOCIAL_LOGIN_DETAILS:
      return {
        ...state,
        socialLoginDetail: action.payload,
      };

    case USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };

    case Response_Status:
      return {
        ...state,
        response_status: action.payload,
      };
    case LOGOUT:
      return {
        user: {},
        response_status: {},
        is_loading: false,
        otp: '',
        user_details: null,
        user_id: null,
        login: true,
        socialLoginDetail: null,
      };
    default: {
      return state;
    }
  }
};
export default AuthReducer;
