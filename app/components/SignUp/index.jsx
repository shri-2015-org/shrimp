import React, {PropTypes} from 'react';
import store from 'store';
import {connect} from 'react-redux';
import Immutable, {Map} from 'immutable';
import cookies from 'browser-cookies';
import cx from 'classnames';
import {init, initUser} from 'actions/local';
import InfoMessage from 'components/InfoMessage';
import PasswordInput from 'components/PasswordInput';
import Input from 'components/Input';
import Button from 'components/Button';
import './styles.scss';
import throttle from 'lodash.throttle';

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
      login: '',
      email: '',
      password: '',
      repeatedPassword: '',
      showPasswordError: false,
      showSecondPasswordError: false,
      showLoginError: false,
      showEmailError: false,
    };
    this.checkLogin = throttle(this.checkLogin, 800);
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

    if (!this.state.login) {
      return this.setState({
        showLoginError: true,
        info: {
          type: 'error',
          text: 'Login is required',
        },
      });
    }

    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: 'Valid email is required',
        },
      });
    }

    if (!this.state.password) {
      return this.setState({
        showPasswordError: true,
        showSecondPasswordError: true,
        info: {
          type: 'error',
          text: 'Password is required',
        },
      });
    }

    if (this.state.password !== this.state.repeatedPassword) {
      return this.setState({
        showSecondPasswordError: true,
        info: {
          type: 'error',
          text: 'The passwords don\'t match. Please check and try again.',
        },
      });
    }

    const authData = {
      login: this.state.login,
      password: this.state.password,
      email: this.state.email,
    };

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

  checkLogin = (value) => {
    fetch('/checkloginexist', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(value),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then(data => {
          if (data) {
            this.setState({
              info: {
                type: 'error',
                text: 'Login exist',
              },
              login: value.login,
              showLoginError: true,
              loginExist: true,
            });
          } else {
            this.setState({
              info: {
                type: 'info',
                text: 'Fill these fields',
              },
              login: value.login,
              showLoginError: false,
              loginExist: false,
            });
          }
        });
      } else {
        return;
      }
    });
  }

  loginChange = e => {
    const value = {
      login: e.target.value,
    };

    this.checkLogin(value);
  }


  emailChange = e => {
    this.setState({
      email: e.target.value,
      showEmailError: false,
    });
  }


  emailChange = e => {
    this.setState({
      email: e.target.value,
      showEmailError: false,
    });
  }


  passwordChange = e => {
    this.setState({
      password: e.target.value,
      showSecondPasswordError: false,
      showPasswordError: false,
    });
  }


  repeatedPasswordChange = e => {
    this.setState({
      repeatedPassword: e.target.value,
      showSecondPasswordError: false,
      showPasswordError: false,
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
          className={cx('sign-up__input', {
            'input_type_error': this.state.showLoginError,
            'input_type_succes': !this.state.loginExist && this.state.login,
          })}
          placeholder='Login'
          onChange={this.loginChange}
        />
        <Input
          className={cx('sign-up__input', {
            'input_type_error': this.state.showEmailError,
          })}
          placeholder='Email'
          onChange={this.emailChange}
        />
        <PasswordInput
          className='sign-up__input'
          placeholder='Password'
          onChange={this.passwordChange}
        />
        <PasswordInput
          className={cx('sign-up__input', {
            'input_type_error': this.state.showSecondPasswordError,
            'input_type_succes': this.state.password && this.state.password === this.state.repeatedPassword,
          })}
          placeholder='Repeat password'
          onChange={this.repeatedPasswordChange}
        />
        <Button
          className='sign-up__submit-button button_type_green'
          type='submit'
        >Sign Up</Button>
      </form>
    );
  }
}
