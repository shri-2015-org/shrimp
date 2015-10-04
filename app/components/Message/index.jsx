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
    senderRepeated: PropTypes.bool.isRequired,
    nextMessageIsMain: PropTypes.bool.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }


  componentDidMount = () => {
    this.updateTime(this.props.timestamp);
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
      <img
        className='message__avatar'
        src={sender.get('avatar')}
        width='50'
        height='50'
      />
    );
  }


  render() {
    const {sender, text, currentUserId, senderRepeated, nextMessageIsMain} = this.props;
    const isSelfMessage = sender.get('id') === currentUserId;
    return (
      <li className={cx('message', {
        'message_repeated': senderRepeated,
        'message_last': !nextMessageIsMain,
      })}>
        {isSelfMessage ? null : this.renderAvatar(sender)}
        {isSelfMessage || senderRepeated ? null : <div className='message__username'>{sender.get('name')}</div>}
        <div className={cx('message__cloud', {message__cloud_other: !isSelfMessage})}>
          <div className='message__text'>{text}</div>
          <div className='message__date'>{this.state.date + ' ago'}</div>
        </div>
      </li>
    );
  }
}
