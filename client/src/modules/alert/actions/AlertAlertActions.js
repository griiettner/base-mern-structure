// @flow
import { alertAlertConstants } from '../constants';

class AlertAlertActions {
  success = (message: string): Object => ({ type: alertAlertConstants.SUCCESS, message });

  error = (message: string): Object => ({ type: alertAlertConstants.ERROR, message });

  clear = (): Object => ({ type: alertAlertConstants.CLEAR });
}

export default AlertAlertActions;
