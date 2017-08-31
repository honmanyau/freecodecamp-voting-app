import firebase from '../firebase';

export const FETCHING_POLLS = 'FETCHING_POLLS';
export const FETCH_LATEST_POLLS = 'FETCH_LATEST_POLLS';
export const FETCH_USER_POLLS = 'FETCH_USER_POLLS';
export const STORE_POLLS = 'STORE_POLLS';
export const FETCH_ERROR = 'FETCH_ERROR';

export function fetchLatestPolls() {
  return function(dispatch) {
    dispatch(fetchingPolls(true));

    firebase.database().ref('/voting-app/polls').on('value', snapshot => {
      dispatch(storePolls(snapshot.val()));
    }, error => {
      dispatch(fetchError(error))
    })
  }
}

export function fetchUserPolls(uid) {
  return function(dispatch) {
    dispatch(fetchingPolls(true));

    firebase.database().ref(`/voting-app/polls`).orderByChild('ownerUid').equalTo(uid).on('value', snapshot => {
      dispatch(storePolls(snapshot.val()));
    }, error => {
      dispatch(fetchError(error))
    })
  }
}

export function fetchingPolls(status) {
  return {
    type: FETCHING_POLLS,
    payload: {
      status
    }
  }
}

export function storePolls(polls) {
  return {
    type: STORE_POLLS,
    payload: {
      polls
    }
  }
}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: {
      error: JSON.stringify(error)
    }
  }
}
