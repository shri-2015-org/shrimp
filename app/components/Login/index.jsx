import React, {PropTypes} from 'react';
import * as actionsLocal from 'actions/local';
import {bindActionCreators} from 'redux';
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
      debugger;
      const user = nextProps.local.get('user');
      if (user && user.status) {
        if (user.status.text === this.state.info.text && user.status.type === this.state.info.type) {
          this.setState({shakeInfo: true});
          setTimeout(this.setState.bind(this, {shakeInfo: false}), 500);
        } else {
          this.setState({
            info: {
              type: user.status.type,
              text: user.status.text,
            },
          });
        }
      }
    }
  }


  shouldComponentUpdate() {
    return true;
  }

  auth = (e) => {
    e.preventDefault();
    const authData = {
      login: e.target[0].value,
      password: e.target[1].value,
    };
    this.state.actions.signIn(authData);
    return;
  }


  render() {
    this.state.actions = bindActionCreators(actionsLocal, store.dispatch);

    return (
      <form className='login' onSubmit={this.auth}>
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
        >Log In</Button>
      </form>
    );
  }
}
