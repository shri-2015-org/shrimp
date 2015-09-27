import React from 'react';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';


export default class SignUp extends React.Component {

  render() {
    return (
      <form className='sign-up'>
        <InfoMessage
          className='sign-up__info-message'
        >Enter login and password</InfoMessage>
        <Input className='sign-up__input' placeholder='Login' />
        <PasswordInput className='sign-up__input' />
        <PasswordInput className='sign-up__input' placeholder='Repeat password' />
        <Button
          className='sign-up__submit-button button_type_green'
          type='submit'
          onClick={this.auth}
        >Sign Up</Button>
      </form>
    );
  }
}
