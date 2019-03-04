// @flow
import { usersUsersConstants } from '../constants';

const registrationUserReducer = (state: Object = {}, action: Object): Object => {
  const { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } = usersUsersConstants;
  console.log(action);
  switch (action.type) {
    case REGISTER_REQUEST:
      return { registering: true };
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};

export default registrationUserReducer;
