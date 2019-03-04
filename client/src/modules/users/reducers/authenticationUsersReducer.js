// @flow
import { usersUsersConstants } from '../constants';
import { config } from '../../../config/default';

const { metadata } = config;

type Session = {
  type: String,
  session: Object
};

type State = {
  loggedIn: boolean,
  session: Session
};

const prevSession = JSON.parse(localStorage.getItem(metadata.localStorageName) || '{}');
const initialState: State = prevSession ? { loggedIn: true, session: prevSession } : {};

const authenticationUsersReducer = (state: State = initialState, action: Session) => {
  const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = usersUsersConstants;
  const { type, session } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        session
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        session
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authenticationUsersReducer;
