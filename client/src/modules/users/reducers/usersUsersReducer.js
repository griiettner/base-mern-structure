// @flow
import { usersUsersConstants } from '../constants';

const usersUsersReducer = (state: Object = {}, action: Object) => {
  const {
    GETALL_REQUEST,
    GETALL_SUCCESS,
    GETALL_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    USERS_GETBY_REQUEST,
    USERS_GETBY_SUCCESS,
    USERS_GETBY_FAILURE
  } = usersUsersConstants;

  switch (action.type) {
    case USERS_GETBY_REQUEST:
      return { loading: true };
    case USERS_GETBY_SUCCESS:
      return action.res;
    case USERS_GETBY_FAILURE:
      return { error: action.error };
    case GETALL_REQUEST:
      return { loading: true };
    case GETALL_SUCCESS:
      return { items: action.users };
    case GETALL_FAILURE:
      return { error: action.error };
    case DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user => (user.id === action.id ? { ...user, deleting: true } : user))
      };
    case DELETE_SUCCESS:
      // remove deleted user from state
      return { items: state.items.filter(user => user.id !== action.id) };
    case DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state;
  }
};

export default usersUsersReducer;
