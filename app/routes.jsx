import React from 'react';
import {Route} from 'react-router';
import App from 'App';
import LogInPage from 'components/LogInPage';


export default (
  <div>
    <Route path='/' component={App} />
    <Route path='/login' component={LogInPage} />
  </div>
);
