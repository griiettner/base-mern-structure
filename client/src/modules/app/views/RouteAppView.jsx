// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { config } from '../../../config/default';

const { metadata } = config;

type PrivateRouteType = {
  component: ComponentType<*>,
  exact: boolean,
  path: string
};

const RouteAppView = ({ component: Component, ...rest }: PrivateRouteType) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(metadata.localStorageName) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default RouteAppView;
