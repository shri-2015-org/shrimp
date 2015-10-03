import React, {PropTypes} from 'react';
import {Spring} from 'react-motion';
import cx from 'classnames';
import './styles.scss';


export default class InfoMessage extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    shake: PropTypes.bool,
  }


  constructor(props) {
    super(props);
    this.state = {
      shaking: false,
      changing: false,
      children: this.props.children,
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.children === this.props.children &&
        nextProps.type === this.props.type &&
        nextProps.shake === this.props.shake &&
        nextState.changing === this.state.changing &&
        nextState.children === this.state.children) {
      return false;
    }
    if (nextProps.shake !== this.props.shake) {
      this.setState({
        shaking: this.props.shake,
      });
      return true;
    }
    if (!this.state.changing) {
      this.setState({
        changing: true,
      });
      setTimeout(() => {
        this.setState({
          changing: false,
          children: nextProps.children,
        });
      }, 500);
    }
    return true;
  }


  render() {
    const {type, className} = this.props;
    const classes = cx(
      className,
      'info-message',
      {
        'info-message_type_warning': type === 'warning',
        'info-message_type_error': type === 'error',
        'info-message_type_success': type === 'success',
        'info-message_shake': this.state.shaking,
      }
    );

    const getMessageText = (interpolated) => (
      <div
        className='info-message__text'
        style={{transform: `translateX(-${interpolated.val}%)`}}
      >
        {this.state.children}
      </div>
    );

    return (
      <div className={classes}>
        <Spring
          defaultValue={{val: 0}}
          endValue={{val: this.state.changing ? 100 : 0, config: [1000, 100]}}
        >
          {(interpolated) => getMessageText(interpolated)}
        </Spring>
      </div>
    );
  }
}
