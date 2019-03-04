// @flow

declare type ElementEvent<E> = {
  target: E
} & Event;

declare type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  id?: number
};
