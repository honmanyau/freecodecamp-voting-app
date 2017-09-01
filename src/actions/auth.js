import firebase, { twitterAuthProvider } from '../firebase';

export const AUTH_IN_PROGRESS = 'AUTH_IN_PROGRESS';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';


export function checkAuth() {
  return function(dispatch) {
    dispatch(authInProgress(true));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser(user));
      }
      else {
        dispatch(signOutUser());
      }
    });
  }
}

export function checkProviderAuth() {
  return function(dispatch) {
    dispatch(authInProgress(true));

    firebase.auth().getRedirectResult()
      .then(result => {
        if (result && !result.user) {
          dispatch(authInProgress(false));
        }
        // authUser(result.user) is not invoked here as checkAuth() is already listening to the change
      })
      .catch(error => console.log('Error occured during provider authentication.', error))
  }
}

export function registerUser(email, password, username) {
  return function(dispatch) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          displayName: username
        })
        .then(() => {
          dispatch(authUser(user));
        })
        .catch((error) => console.log('Error occured when updating the display name of ' + user.email + '.'))

      })
      .catch(error => {
        console.log("Error during registration authentication.", error);
        dispatch(authError(error.message));
      });
  }
}

export function signInUser(email, password) {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(authUser(user));
      })
      .catch(error => {
        console.log("Error during sign-in authentication.", error);
        dispatch(authError(error.message));
      });
  }
}

export function signInUserWithTwitter() {
  return function(dispatch) {
    firebase.auth().signInWithRedirect(twitterAuthProvider)
      .catch(error => console.log('Error occured during Twitter sign in.'));
  }
}

export function signOutUser() {
  return function(dispatch) {
    dispatch(authInProgress(true));

    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT_USER
        })
      });
  }
}

export function authInProgress(status) {
  return {
    type: AUTH_IN_PROGRESS,
    payload: {
      status
    }
  }
}

export function authUser(user) {
  return {
    type: AUTH_USER,
    payload: {
      data: user
    }
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: {
      error
    }
  }
}
