import React, {PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import LoginWindow from 'components/LoginWindow';
import './styles.scss';


export default class LoginPage extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }


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
    const getRect = interpolated => (
      <div
        className='login-page__rect'
        style={{top: interpolated.y + '%'}}
      />
    );

    return (
      <div className='login-page'>
        {this.state.showWindow ? <LoginWindow>{this.props.children}</LoginWindow> : null}
        {this.state.open ?
        <Motion
          defaultStyle={{y: spring(-30)}}
          style={{y: spring(this.state.open ? 50 : -30, [120, 11])}}
        >
          {getRect}
        </Motion>
        : null}
      </div>
    );
  }
}
