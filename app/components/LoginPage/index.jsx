import React from 'react';
import {Spring} from 'react-motion';
import './styles.scss';


export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showWindow: false,
    };
  }


  componentDidMount() {
    setTimeout(this.setState.bind(this, {open: true}), 500);
    setTimeout(this.setState.bind(this, {showWindow: true}), 1000);
  }


  render() {
    const elastic = [120, 11];
    const endRectStyle = {
      y: {
        val: this.state.open ? 50 : -30,
        config: elastic,
      },
    };

    const getRect = (interpolated) => (
      <div
        className='login-page__rect'
        style={{top: interpolated.y.val + '%'}}
      />
    );

    const getLoginWindow = (interpolated) => (
      <div
        className='login-page__login-window'
        style={{transform: `scale(${interpolated.val})`}}
      />
    );

    return (
      <div className='login-page'>
        <Spring
          defaultValue={{val: 0}}
          endValue={{val: this.state.showWindow ? 1 : 0, config: elastic}}
        >
          {interpolated => getLoginWindow(interpolated)}
        </Spring>
        <Spring
          defaultValue={{ y: { val: -15 } }}
          endValue={endRectStyle}
        >
          {interpolated => getRect(interpolated)}
        </Spring>
      </div>
    );
  }
}
