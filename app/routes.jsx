import React from 'react';
import {Route} from 'react-router';
import App from 'App';
import LoginPage from 'components/LoginPage';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import Settings from 'components/PopUp';


export default (
  <div>
    <Route path='/' component={App} >
      <Route path='settings' component={Settings} />
    </Route>
    <Route path='/' component={LoginPage}>
      <Route path='login' component={Login} />
      <Route path='signup' component={SignUp} />
    </Route>
  </div>
);
