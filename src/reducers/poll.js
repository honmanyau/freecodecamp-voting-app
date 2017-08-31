import { POLL_ERROR } from '../actions/poll';



const pollInitialState = {
  error: null
};

export function poll(state = pollInitialState, action) {
  switch(action.type) {
    case POLL_ERROR:
      return Object.assign({}, state, {
        error: action.payload.error
      })

    default:
      return state;
  }
}
