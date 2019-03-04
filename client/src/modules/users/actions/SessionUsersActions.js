// @flow
import { sessionsUsersConstants } from '../constants';

const api = '/api/account/signin';
const { GET_SESSIONS, ADD_SESSION, DELETE_SESSION, SESSION_LOADING } = sessionsUsersConstants;

class SessionUsersActions {
  loading = (): { type: string } => ({ type: SESSION_LOADING });

  get = (): Function => (dispatch: Function): void => {
    dispatch(this.loading());
    fetch.get(api).then(res =>
      dispatch({
        type: GET_SESSIONS,
        payload: res.data
      })
    );
  };

  set = (item: Object): Function => (dispatch: Function): void => {
    fetch.post(api, item).then(res =>
      dispatch({
        type: ADD_SESSION,
        payload: res.data
      })
    );
  };

  delete = (id: string): Function => (dispatch: Function): void => {
    fetch.delete(`${api}/${id}`).then(() =>
      dispatch({
        type: DELETE_SESSION,
        payload: id
      })
    );
  };
}

export default SessionUsersActions;
