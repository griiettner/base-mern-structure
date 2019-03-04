// @flow
import { config } from '../config/default';

const { metadata } = config;

const authHeaderHelper = () => {
  // return authorization header with jwt token
  const session = JSON.parse(localStorage.getItem(metadata.localStorageName) || '{}');
  if (!session && !session.token) return {};
  return { Authorization: `Bearer ${session.token}` };
};

export default authHeaderHelper;
