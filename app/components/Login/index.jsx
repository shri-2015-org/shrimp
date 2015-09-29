import React from 'react';
import * as actionsLocal from 'actions/local';
import {bindActionCreators} from 'redux';
import store from 'store';
import {connect} from 'react-redux';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';

@connect(state => ({
  local: state.local,
}))

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Enter your login and password',
      },
      shakeInfo: false,
    };
  }


  // auth = (e) => {
  //   //e.preventDefault();
  //   if (this.state.info.type === 'error' && this.state.info.code === 1001) {
  //     this.setState({shakeInfo: true});
  //     setTimeout(this.setState.bind(this, {shakeInfo: false}), 500);
  //     return;
  //   }
  //   this.setState({
  //     info: {
  //       code: 1001,
  //       type: 'error',
  //       text: 'Wrong pass',
  //     },
  //     actions: {},
  //     // data: {
  //     //   login: '',
  //     //   password: '',
  //     // },
  //   });
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    const authData = {
      login: e.target[0].value,
      password: e.target[1].value,
    };
    debugger;
    this.state.actions.signIn(authData);
    return;
  }


  render() {
    const {local} = this.props;
    this.state.actions = bindActionCreators(actionsLocal, store.dispatch);

    return (
      <form className='login' onSubmit={this.handleSubmit}>
        <InfoMessage
          className='login__info-message'
          type={this.state.info.type}
          shake={this.state.shakeInfo}
        >{this.state.info.text}</InfoMessage>
        <Input className='login__input' placeholder='Login <Ricardo32>' />
        <PasswordInput className='login__input' />
        <Button
          className='login__submit-button'
          type='submit'
          /* onClick={this.auth} */
        >Log In</Button>
      </form>
    );
  }
}
