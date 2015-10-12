import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Motion, spring} from 'react-motion';
import Immutable, {Map, List} from 'immutable';
import cx from 'classnames';
import store from 'store';
import {Link} from 'react-router';
import {changeUserInfo} from 'actions/local';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import InfoMessage from 'components/InfoMessage';
import Input from 'components/Input';
import Button from 'components/Button';
import './styles.scss';


@connect(state => ({
  location: state.router.location.pathname,
  local: state.local,
  users: state.users,
}))

export default class Settings extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.string.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Edit your data',
      },
      shakeInfo: false,
      email: '',
      name: '',
      password: '',
      repeatedPassword: '',
      showPasswordError: false,
      showSecondPasswordError: false,
      showEmailError: false,
      showNameError: false,
    };
  }


  componentWillMount = () => {
    if (this.props.users.size) {
      const currentUser = this.props.users.find(user => user.get('id') === this.props.local.get('userId'));

      this.setState({
        email: currentUser.get('email'),
        name: currentUser.get('name'),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.users, this.props.users)) {
      const currentUser = nextProps.users.find(user => user.get('id') === nextProps.local.get('userId'));

      this.setState({
        email: currentUser.get('email'),
        name: currentUser.get('name'),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.users.size > 0 && !Immutable.is(nextProps.users, this.props.users)) {
      nextProps.history.pushState(null, '/');
    }

    return true;
  }

  changeInfo = (e) => {
    e.preventDefault();

    if (!this.state.email) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: 'Email is required',
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

    if (!this.state.name) {
      return this.setState({
        showNameError: true,
        info: {
          type: 'error',
          text: 'Name is required',
        },
      });
    }

    const changedData = {
      email: this.state.email,
      name: this.state.name,
    };

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


  render() {
    const getSettingsWindow = interpolated => (
      <div className='settings'>
        <div
          className='settings__window'
          style={{transform: `scale(${interpolated.scale})`}}
        >
          <Tabs
            className='settings__tabs'
            currentTabId={1}
          >
            <Tab id={1}>Settings</Tab>
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
              placeholder='Email'
              onChange={this.emailChange}
            />
            <Input
              className={cx('settings__input', {
                'input_type_error': this.state.showNameError,
              })}
              value={this.state.name}
              name='name'
              placeholder='Name'
              onChange={this.nameChange}
            />
            <Button
              className='settings__submit-button'
              type='submit'
            >Save</Button>
          </form>
        </div>
        <Link to='/'>
          <div className='settings__overlay' />
        </Link>
      </div>
    );

    return (
      <Motion
        defaultStyle={{scale: spring(0)}}
        style={{scale: spring(1, [120, 11])}}
      >
        {interpolated => getSettingsWindow(interpolated)}
      </Motion>
    );
  }
}
