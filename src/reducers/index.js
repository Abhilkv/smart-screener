import {combineReducers} from 'redux';
import auth from './auth_reducer';
import check from './check_reducer';

export default combineReducers({
  auth,
  check
});
