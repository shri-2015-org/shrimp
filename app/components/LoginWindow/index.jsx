import React from 'react';
import {Spring} from 'react-motion';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import './styles.scss';


export default class LoginWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 1,
    };
  }


  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  }


  render() {
    const getLoginWindow = (interpolated) => (
      <div
        className='login-window'
        style={{transform: `scale(${interpolated.val})`}}
      >
        <Tabs
          className='login-window__tabs'
          currentTabId={this.state.currentTabId}
          changeTab={this.changeTab}
        >
          <Tab id={1} name='Log In' />
          <Tab id={2} name='Sign Up' />
        </Tabs>
      </div>
    );

    return (
      <Spring
        defaultValue={{val: 0}}
        endValue={{val: 1, config: [120, 11]}}
      >
        {interpolated => getLoginWindow(interpolated)}
      </Spring>
    );
  }
}
