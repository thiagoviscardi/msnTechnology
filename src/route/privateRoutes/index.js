import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useAuth } from 'hook/auth';
import LoginPage from 'page/login';
import Components from 'page/components';
import HasPermission from 'utils/checkPermission';
import { routes } from './routes';
import DashboardPage from 'page/dashboard';

function PrivateRoute({ component: Component, ...rest }) {
  // const { userLogged } = useAuth(); to do thiago voltar isso depois
  let permission = { ...rest }.permission;
  let path = { ...rest }.path;
  const userLogged = 1;
  console.log(permission, 'permission');
  console.log(userLogged, 'userLogged');
  if (userLogged == '') {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  } else if (
    (permission == null && !path.includes('settings')) ||
    HasPermission(permission)
  ) {
    return <Route {...rest} render={() => <Component />} />;
  }
  return (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  );
}

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/components">
        <Components />
      </Route>
      {routes.map(({ component, path, exact, permission }) => (
        <PrivateRoute
          component={component}
          permission={permission}
          exact={exact}
          key={path}
          path={path}
        />
      ))}
      <Route path="/*">
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
