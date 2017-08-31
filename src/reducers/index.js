import { combineReducers } from 'redux';

import { user } from './auth';
import { fetch } from './fetch';
import { poll } from './poll';


export default combineReducers({
  user,
  fetch,
  poll
});
