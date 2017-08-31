import { AUTH_IN_PROGRESS, AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../actions/auth';



const authInitialState = {
  inProgress: true,
  authenticated: false,
  data: null,
  error: null
}

export function user(state = authInitialState, action) {
  switch (action.type) {
    case AUTH_IN_PROGRESS:
      return Object.assign({}, state, {
        inProgress: action.payload.status
      });

    case AUTH_USER:
      return Object.assign({}, state, {
        inProgress: false,
        authenticated: true,
        data: action.payload.data,
        error: null
      });

    case AUTH_ERROR:
      return Object.assign({}, state, {
        inProgress: false,
        authenticated: false,
        data: null,
        error: action.payload.error
      });

    case SIGN_OUT_USER:
      return Object.assign({}, state, {
        inProgress: false,
        authenticated: false,
        data: null,
        error: null
      });

    default:
      return state;
  }
}
