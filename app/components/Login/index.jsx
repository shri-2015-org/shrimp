import React from 'react';
import cx from 'classnames';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Enter your login and password',
      },
      shakePassword: false,
    };
  }

  auth = (e) => {
    e.preventDefault();
    if (this.state.info.type === 'error' && this.state.info.code === 1001) {
      this.setState({shakePassword: true});
      setTimeout(() => this.setState({shakePassword: false}), 500);
      return;
    }
    this.setState({
      info: {
        code: 1001,
        type: 'error',
        text: 'Wrong pass',
      },
    });
  }


  render() {
    return (
      <form className='login'>
        <InfoMessage
          className='login__info-message'
          type={this.state.info.type}
          shake={this.state.shakePassword}
        >{this.state.info.text}</InfoMessage>
        <Input className='login__input' placeholder='Login' />
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
