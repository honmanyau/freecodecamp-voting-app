import { FETCHING_POLLS, STORE_POLLS, FETCH_ERROR } from '../actions/fetch';



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

    default:
      return state;
  }
}
