import React from 'react';
import store from 'store';
import {connect} from 'react-redux';
import {init, initUser} from 'actions/local';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';


@connect(state => ({
  local: state.local,
}))

export default class SignUp extends React.Component {

  signUp = (e) => {
    e.preventDefault();
    const authData = {
      login: e.target.login.value,
      password: e.target.password.value,
    };

    // store.dispatch(signIn(authData));

    fetch('/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(authData),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then(data => {
          if (data.local) {
            store.dispatch(init(data));
          } else {
            store.dispatch(initUser(data));
          }
        });
      } else {
        return;
      }
    });
  }


  render() {
    return (
      <form className='sign-up' onSubmit={this.signUp} >
        <InfoMessage
          className='sign-up__info-message'
        >Enter login and password</InfoMessage>
        <Input
          className='sign-up__input'
          name='login'
          placeholder='Login'
        />
        <PasswordInput
          className='sign-up__input'
          name='pasword'
          placeholder='Password'
        />
        <PasswordInput
          className='sign-up__input'
          placeholder='Repeat password'
        />
        <Button
          className='sign-up__submit-button button_type_green'
          type='submit'
        >Sign Up</Button>
      </form>
    );
  }
}
