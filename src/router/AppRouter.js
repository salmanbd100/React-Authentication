import React from 'react';
import { Home, Login } from 'pages';
import { Route, Switch, Redirect } from 'react-router-dom';

const PrivetRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default function AppRouter(props) {
  return (
    <Switch>
      <PrivetRoute path='/' component={Home} exact {...props} />
      {!props.isAuth ? (
        <Route path='/login' component={Login} />
      ) : (
        <Redirect to='/' />
      )}
    </Switch>
  );
}
