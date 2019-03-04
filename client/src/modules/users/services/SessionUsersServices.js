// @flow
import axios from 'axios';
import { authHeaderHelper as authHeader } from '../../../helpers';
import { config } from '../../../config/default';

const { apiUrl } = config;

class SessionUsersServices {
  handleResponse = (response: { ok: boolean, status: number, statusText: string, +text: Function }) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      // Remove password from object
      return data;
    });
  };

  delete = (id: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    };

    return axios(`${apiUrl}/account/logout?token=${id}`, requestOptions).then(res => {
      if (res) return console.error(res);

      console.log('User successfully removed from polls collection!');
      return res.status(200).send();
    });
  };
}

export default SessionUsersServices;
