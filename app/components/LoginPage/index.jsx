import React from 'react';
import {Spring} from 'react-motion';
import LoginWindow from 'components/LoginWindow';
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
    const endRectStyle = {
      y: {
        val: this.state.open ? 50 : -30,
        config: [120, 11],
      },
    };

    const getRect = (interpolated) => (
      <div
        className='login-page__rect'
        style={{top: interpolated.y.val + '%'}}
      />
    );

    return (
      <div className='login-page'>
        {this.state.showWindow ? <LoginWindow /> : null}
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
