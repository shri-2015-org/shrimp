import React from 'react';
import {Route} from 'react-router';
import App from 'App';
import LoginPage from 'components/LoginPage';


export default (
  <div>
    <Route path='/' component={App} />
    <Route path='/login' component={LoginPage} />
  </div>
);