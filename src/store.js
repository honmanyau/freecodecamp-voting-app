import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { checkAuth, checkProviderAuth } from './actions/auth';
import reducer from './reducers';



const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.dispatch(checkAuth());
store.dispatch(checkProviderAuth());

export default store;
