import { combineReducers } from 'redux';
import users from '../modules/users/reducers';
import alert from '../modules/alert/reducers';

const rootReducerHelper = combineReducers({
  users,
  alert
});

export default rootReducerHelper;
