import React from 'react';
import {Spring} from 'react-motion';
import './styles.scss';


export default class LoginWindow extends React.Component {
  render() {
    const getLoginWindow = (interpolated) => (
      <div
        className='login-window'
        style={{transform: `scale(${interpolated.val})`}}
      />
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
