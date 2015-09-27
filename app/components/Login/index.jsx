import React from 'react';
import InfoMessage from 'components/InfoMessage';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';

import './styles.scss';


export default class Login extends React.Component {

  render() {
    return (
      <div className='login'>
        <InfoMessage
          className='login__info-message'
        >Enter your login and password</InfoMessage>
        <Input className='login__input' placeholder='login' />
        <PasswordInput className='login__input' />
      </div>
    );
  }
}
