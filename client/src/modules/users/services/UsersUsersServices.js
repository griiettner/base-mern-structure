// @flow
import axios from 'axios';
import { authHeaderHelper as authHeader } from '../../../helpers';
import { config } from '../../../config/default';
import { SessionUsersServices } from '.';

const { metadata, apiUrl } = config;

class UsersUsersServices {
  handleResponse = (response: { ok: boolean, status: number, statusText: string, +text: Function }) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          this.logout();
          window.location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      // Remove password from object
      delete data.password;
      return data;
    });
  };

  login = (email: string, password: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}/account/signin`, requestOptions)
      .then(res => this.handleResponse(res))
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(metadata.localStorageName, JSON.stringify(user));
        return user;
      })
      .catch(error => console.error(error));
  };

  logout = (): void => {
    const sessionAction = new SessionUsersServices();
    const { token } = JSON.parse(localStorage.getItem(metadata.localStorageName));

    this.getBy('token', token).then(data => {
      sessionAction.delete(data._id);
    });
    // remove user from local storage to log user out
    // localStorage.removeItem(metadata.localStorageName);
  };

  getAll = (): void => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    return axios(`${apiUrl}/users`, requestOptions).then(res => this.handleResponse(res));
  };

  getById = (id: string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(res => this.handleResponse(res));
  };

  getBy = (type: string, param: string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    };

    return fetch(
      `${apiUrl}/account/users/getBy${type.charAt(0).toUpperCase()}${type.slice(1)}/${param}`,
      requestOptions
    ).then(res => this.handleResponse(res));
  };

  register = (user: User) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/account/signup`, requestOptions).then(res => this.handleResponse(res));
  };

  update = (user: User) => {
    const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    return user.id ? axios(`${apiUrl}/users/${user.id}`, requestOptions).then(res => this.handleResponse(res)) : null;
  };

  delete = (id: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    };

    return axios(`${apiUrl}/users/${id}`, requestOptions).then(res => this.handleResponse(res));
  };
}

export default UsersUsersServices;
