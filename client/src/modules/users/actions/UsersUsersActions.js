// @flow
import { usersUsersConstants } from '../constants';
import { UsersUsersService } from '../services';
import { AlertAlertActions } from '../../alert/actions';
import { historyHelper as history } from '../../../helpers';

type dispacthObjType = {
  error?: string,
  id?: string,
  type: string,
  user?: string
};

const service: Function = new UsersUsersService();
const alertActions: Function = new AlertAlertActions();

class UsersUsersActions {
  dispacthObj = (type: string, res?: string): dispacthObjType => ({ type, res });

  login = (username: string, password: string): Function => (dispatch: Function) => {
    const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = usersUsersConstants;
    dispatch(this.dispacthObj(LOGIN_REQUEST, username));

    service.login(username, password).then(
      user => {
        dispatch(this.dispacthObj(LOGIN_SUCCESS, user));
        history.push('/');
      },
      error => {
        dispatch(this.dispacthObj(LOGIN_FAILURE, error));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  logout = (): dispacthObjType => {
    service.logout();
    return { type: usersUsersConstants.LOGOUT };
  };

  register = (username: string) => (dispatch: Function): Function => {
    const { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } = usersUsersConstants;
    dispatch(this.dispacthObj(REGISTER_REQUEST, username));

    service.register(username).then(
      user => {
        dispatch(this.dispacthObj(REGISTER_SUCCESS, user));
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(this.dispacthObj(REGISTER_FAILURE, error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  getAll = () => (dispatch: Function): Function => {
    const { GETALL_REQUEST, GETALL_SUCCESS, GETALL_FAILURE } = usersUsersConstants;
    dispatch(this.dispacthObj(GETALL_REQUEST));

    service.getAll().then(
      users => {
        dispatch(this.dispacthObj(GETALL_SUCCESS, users));
      },
      error => {
        dispatch(this.dispacthObj(GETALL_FAILURE, error.toString()));
      }
    );
  };

  getBy = (type: string, param: string): Function => (dispatch: Function): Function => {
    const { USERS_GETBY_REQUEST, USERS_GETBY_SUCCESS, USERS_GETBY_FAILURE } = usersUsersConstants;

    dispatch(this.dispacthObj(USERS_GETBY_REQUEST));

    service.getBy(type, param).then(
      user => {
        dispatch(this.dispacthObj(USERS_GETBY_SUCCESS, user));
      },
      error => {
        dispatch(this.dispacthObj(USERS_GETBY_FAILURE, error.toString()));
      }
    );
  };

  delete = (sessionId: string) => (dispatch: Function): Function => {
    const { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } = usersUsersConstants;
    dispatch(this.dispacthObj(DELETE_REQUEST));

    service.delete(sessionId).then(
      id => {
        dispatch(this.dispacthObj(DELETE_SUCCESS, id));
      },
      error => {
        dispatch(this.dispacthObj(DELETE_FAILURE, error.toString()));
      }
    );
  };
}

export default UsersUsersActions;
