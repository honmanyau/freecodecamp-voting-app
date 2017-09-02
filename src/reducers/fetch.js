import { FETCHING_POLLS, STORE_POLLS, FETCH_ERROR, CREATING_POLL, SUBMITTING_VOTE, EDITING_POLL, DELETING_POLL } from '../actions/fetch';



const fetchInitialState = {
  isFetching: false,
  content: null,
  error: null
}

export function fetch(state = fetchInitialState, action) {
  switch(action.type) {
    case FETCHING_POLLS:
      return Object.assign({}, state, {
        isFetching: action.payload.status
      });

    case STORE_POLLS:
      return Object.assign({}, state, {
        isFetching: false,
        content: action.payload.polls,
        error: null
      });

    case FETCH_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload.error
      });

    case CREATING_POLL:
      return Object.assign({}, state, {
        isFetching: false,
        content: action.payload.tempPolls,
        error: null
      });

    case SUBMITTING_VOTE:
    case EDITING_POLL:
    case DELETING_POLL:
      return Object.assign({}, state, {
        isFetching: false,
        content: action.payload.tempPolls,
        error: null
      });

    default:
      return state;
  }
}
