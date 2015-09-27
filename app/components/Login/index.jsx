import React from 'react';
import InfoMessage from 'components/InfoMessage';

import './styles.scss';


export default class Login extends React.Component {

  render() {
    return (
      <div>
        <InfoMessage
          className='login__info-message'
        >Enter your login and password</InfoMessage>
      </div>
    );
  }
}
