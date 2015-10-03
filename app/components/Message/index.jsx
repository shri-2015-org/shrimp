import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import moment from 'moment';


export default class Message extends React.Component {

  static propTypes = {
    sender: PropTypes.instanceOf(Map).isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }


  componentDidMount = () => {
    this.updateTime();
    this.timer = setInterval(()=>{
      this.updateTime(this.props.timestamp);
    }, 5000);
  }


  componentWillUnmount = () => {
    clearInterval(this.timer);
  }


  updateTime = (timestamp) => {
    const date = moment.duration(moment().diff(moment(timestamp))).humanize();
    this.setState({
      date: date,
    });
  }


  renderAvatar = (sender) => {
    return (
      <div className='message__avatar'>
        <img
          className='message__img'
          src={sender.get('avatar')}
          width='50'
          height='50'
        />
      </div>
    );
  }


  render() {
    const {sender, text, currentUserId} = this.props;
    const isSelfMessage = sender.get('id') === currentUserId;
    return (
      <li className='message'>
        {isSelfMessage ? null : this.renderAvatar(sender)}
        <div className={cx('message__cloud', {message__cloud_other: !isSelfMessage})}>
          <div className='message__text'>
            <strong>{sender.get('name') + ':'}</strong>
            <br />
            {text}
          </div>
          <div className='message__date'>{this.state.date + ' ago'}</div>
        </div>
      </li>
    );
  }
}
