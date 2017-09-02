import firebase from '../firebase';



export const FETCHING_POLLS = 'FETCHING_POLLS';
export const FETCH_LATEST_POLLS = 'FETCH_LATEST_POLLS';
export const FETCH_USER_POLLS = 'FETCH_USER_POLLS';
export const STORE_POLLS = 'STORE_POLLS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const CREATING_POLL = 'CREATING_POLL';
export const SUBMITTING_VOTE = 'SUBMITTING_VOTE';
export const EDITING_POLL = 'EDITING_POLL';

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

export function creatingPoll(tempPolls) {
  return {
    type: CREATING_POLL,
    payload: {
      tempPolls
    }
  }
}

export function submittingVote(tempPolls) {
  return {
    type: SUBMITTING_VOTE,
    payload: {
      tempPolls
    }
  }
}

export function editingPoll(tempPolls) {
  return {
    type: EDITING_POLL,
    payload: {
      tempPolls
    }
  }
}
