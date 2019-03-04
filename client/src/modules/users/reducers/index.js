import { combineReducers } from 'redux';
import user from './usersUsersReducer';
import authentication from './authenticationUsersReducer';
import registration from './registrationUsersReducer';

const usersReducers = combineReducers({
  authentication,
  registration,
  user
});

export default usersReducers;
