import React from 'react';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';


export default class Login extends React.Component {

  auth = (e) => {
    e.preventDefault();
  }


  render() {
    return (
      <form className='login'>
        <InfoMessage
          className='login__info-message'
        >Enter your login and password</InfoMessage>
        <Input className='login__input' placeholder='login' />
        <PasswordInput className='login__input' />
        <Button
          className='login__submit-button'
          type='submit'
          onClick={this.auth}
        >Log In</Button>
      </form>
    );
  }
}
