import React, {PropTypes} from 'react';
import {signIn} from 'actions/local';
import store from 'store';
import {connect} from 'react-redux';
import Immutable, {Map} from 'immutable';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';


@connect(state => ({
  local: state.local,
}))

export default class Login extends React.Component {
  static propTypes = {
    local: PropTypes.instanceOf(Map).isRequired,
  }


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


  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.local, this.props.local)) {
      if (nextProps.local.get('sessionId')) {
        document.cookie = 'sessionId=' + nextProps.local.get('sessionId');
        nextProps.history.pushState(null, '/');
      } else {
        const user = nextProps.local.get('user');
        this.setState({
          info: {
            type: user.status.type,
            text: user.status.text,
          },
        });
      }
    }
  }


  auth = (e) => {
    e.preventDefault();
    const authData = {
      login: e.target.login.value,
      password: e.target.password.value,
    };

    store.dispatch(signIn(authData));
  }


  render() {
    return (
      <form
        className='login'
        onSubmit={this.auth}
      >
        <InfoMessage
          className='login__info-message'
          type={this.state.info.type}
          shake={this.state.shakeInfo}
        >{this.state.info.text}</InfoMessage>
        <Input
          className='login__input'
          value={this.state.login}
          name='login'
          placeholder='Login'
        />
        <PasswordInput
          className='login__input'
          name='password'
        />
        <Button
          className='login__submit-button'
          type='submit'
        >Log In</Button>
      </form>
    );
  }
}
