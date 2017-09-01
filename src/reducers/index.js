import { combineReducers } from 'redux';

import { user } from './auth';
import { fetch } from './fetch';



export default combineReducers({
  user,
  fetch
});
