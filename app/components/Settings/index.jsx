import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PopUp from 'components/PopUp';
import Immutable, {Map, List} from 'immutable';
import cx from 'classnames';
import store from 'store';
import puttext from 'puttext';
import i18nMessages from 'i18n/index';
import {localSelector} from 'selectors/localSelector';
import {Link} from 'react-router';
import {changeUserInfo, setLanguage} from 'actions/local';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import InfoMessage from 'components/InfoMessage';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import './styles.scss';


@connect(state => ({
  location: state.router.location.pathname,
  local: localSelector(state),
  users: state.users,
}))

export default class Settings extends React.Component {

  static propTypes = {
    location: PropTypes.string.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    children: PropTypes.node,
  }


  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: this.__('Edit your data'),
      },
      shakeInfo: false,
      email: '',
      name: '',
      language: 'en',
      password: '',
      repeatedPassword: '',
      showPasswordError: false,
      showSecondPasswordError: false,
      showEmailError: false,
      showNameError: false,
      inProgress: false,
    };
  }


  componentWillMount = () => {
    if (this.props.users.size) {
      this.setState({
        email: this.props.local.get('email'),
        name: this.props.local.get('name'),
        language: this.props.local.get('language'),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.users, this.props.users)) {
      this.setState({
        email: nextProps.local.get('email'),
        name: nextProps.local.get('name'),
        language: nextProps.local.get('language'),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.users.size > 0 && !Immutable.is(nextProps.users, this.props.users) && !Immutable.is(nextProps.users, this.props.users)) {
      nextProps.history.pushState(null, '/');
    }

    return true;
  }
  __ = puttext(i18nMessages[this.props.local.get('language')])

  checkEmailExists(email) {
    const userWithSuchEmail = this.props.users.find(item => item.get('email') === email);
    return (!userWithSuchEmail || (userWithSuchEmail.get('id') === this.props.local.get('userId'))) ? false : true;
  }

  changeInfo = (e) => {
    e.preventDefault();

    if (!this.state.email) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: this.__('Email is required'),
        },
      });
    }

    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: this.__('Valid email is required'),
        },
      });
    }

    if (this.checkEmailExists(this.state.email)) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: this.__('Email already exsisted'),
        },
      });
    }

    if (!this.state.name) {
      return this.setState({
        showNameError: true,
        info: {
          type: 'error',
          text: this.__('Name is required'),
        },
      });
    }


    const changedData = {
      email: this.state.email,
      name: this.state.name,
      language: this.state.language,
    };


    this.setState({
      inProgress: true,
    });
    store.dispatch(changeUserInfo(changedData));
  }

  emailChange = e => {
    this.setState({
      email: e.target.value,
      showEmailError: false,
    });
  }


  nameChange = e => {
    this.setState({
      name: e.target.value,
      showNameError: false,
    });
  }


  languageChange = e => {
    this.setState({
      language: e.target.value,
    });
    store.dispatch(setLanguage(e.target.value));
  }


  render() {
    return (
      <div className='settings'>
        <PopUp className='settings__window'>
          <Tabs
            className='settings__tabs'
            currentTabId={1}
          >
            <Tab id={1}>{this.__('Settings')}</Tab>
          </Tabs>
          <form
            className='settings__form'
            onSubmit={this.changeInfo}
          >
            <InfoMessage
              className='settings__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <Input
              className={cx('settings__input', {
                'input_type_error': this.state.showEmailError,
              })}
              value={this.state.email}
              name='email'
              placeholder={this.__('Email')}
              onChange={this.emailChange}
            />
            <Input
              className={cx('settings__input', {
                'input_type_error': this.state.showNameError,
              })}
              value={this.state.name}
              name='name'
              placeholder={this.__('Name')}
              onChange={this.nameChange}
            />
            <Select
              onChange={this.languageChange}
              name='language'
              defaultValue={this.state.language}
              className='input settings__input'
            >
              <option value='en'>English</option>
              <option value='ru'>Русский</option>
            </Select>
            <Button
              className='settings__submit-button'
              type='submit'
              inProgress={this.state.inProgress}
            >{this.state.inProgress ? this.__('Saving') : this.__('Save')}</Button>
          </form>
        </PopUp>
        <Link to='/'>
          <div className='settings__overlay' />
        </Link>
      </div>
    );
  }
}
