import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-native';
import {useStateValue} from './Auth';

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const [{auth}, dispatch] = useStateValue();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        auth.user?.email ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
}

export default PrivateRoute;
