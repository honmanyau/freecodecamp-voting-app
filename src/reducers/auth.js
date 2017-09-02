import { AUTH_IN_PROGRESS, AUTH_USER, AUTH_ERROR, SIGN_OUT_USER, REDIRECT } from '../actions/auth';



const authInitialState = {
  inProgress: true,
  authenticated: false,
  data: null,
  error: null,
  redirect: false,
  redirectLocation: null
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

    case REDIRECT:
    console.log('REDIRECT SET', action.payload.redirect, action.payload.redirectLocation)
      return Object.assign({}, state, {
        redirect: action.payload.redirect,
        redirectLocation: action.payload.redirectLocation
      });

    default:
      return state;
  }
}
