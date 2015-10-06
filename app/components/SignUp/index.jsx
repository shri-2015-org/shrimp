import React, {PropTypes} from 'react';
import store from 'store';
import {connect} from 'react-redux';
import Immutable, {Map} from 'immutable';
import cookies from 'browser-cookies';
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
  static propTypes = {
    local: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Fill these fields',
      },
      shakeInfo: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.local, this.props.local)) {
      if (nextProps.local.get('sessionId')) {
        cookies.set('sessionId', nextProps.local.get('sessionId'), {expires: 365});
        nextProps.history.pushState(null, '/');
      } else {
        const user = nextProps.local.get('user');
        if (user.status.text === this.state.info.text && user.status.type === this.state.info.type) {
          this.setState({shakeInfo: true});
          setTimeout(this.setState.bind(this, {shakeInfo: false}), 500);
        }
        this.setState({
          info: {
            type: user.status.type,
            text: user.status.text,
          },
        });
      }
    }
  }


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
           type={this.state.info.type}
          shake={this.state.shakeInfo}
        >{this.state.info.text}</InfoMessage>
        <Input
          className='sign-up__input'
          name='login'
          placeholder='Login'
        />
        <PasswordInput
          className='sign-up__input'
          name='password'
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
