import React, {PropTypes} from 'react';
import {pushState} from 'redux-router';
import {connect} from 'react-redux';
import PopUp from 'components/PopUp';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import './styles.scss';


@connect(state => ({
  location: state.router.location.pathname,
}), {pushState})
export default class LoginWindow extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTabId: (path => {
        if (path === '/signup') {
          return 2;
        } else if (path === '/login') {
          return 1;
        }
        return 1;
      }(props.location)),
    };
  }


  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  }


  render() {
    return (
      <PopUp
        className='login-window'
      >
        <Tabs
          className='login-window__tabs'
          currentTabId={this.state.currentTabId}
          changeTab={this.changeTab}
        >
          <Tab id={1} link='/login'>Log In</Tab>
          <Tab id={2} link='/signup'>Sign Up</Tab>
        </Tabs>
        {this.props.children}
      </PopUp>
    );
  }
}
