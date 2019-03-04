// @flow
import { alertAlertConstants } from '../constants';

const alertAlertReducer = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case alertAlertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertAlertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertAlertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alertAlertReducer;
