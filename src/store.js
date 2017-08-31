import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { checkAuth } from './actions/auth';
import reducer from './reducers';



const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.dispatch(checkAuth());

console.log(store.getState());

export default store;
