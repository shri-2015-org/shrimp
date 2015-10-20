import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import moment from 'moment';
import Linkify from 'react-linkify';


export default class Message extends React.Component {

  static propTypes = {
    sender: PropTypes.instanceOf(Map).isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    senderRepeated: PropTypes.bool.isRequired,
    pinned: PropTypes.bool,
    nextMessageIsMain: PropTypes.bool.isRequired,
    pinMessage: PropTypes.func.isRequired,
    unpinMessage: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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

  togglePin = () => {
    if (this.props.pinned) {
      this.props.unpinMessage(this.props.id);
    } else {
      this.props.pinMessage(this.props.id);
    }
  }

  renderAvatar = (sender) => {
    return (
      <img
        className='message__avatar'
        src={sender.get('avatar')}
        width='45'
        height='45'
      />
    );
  }


  render() {
    const {sender, text, currentUserId, senderRepeated, nextMessageIsMain} = this.props;
    const isSelfMessage = sender.get('id') === currentUserId;
    const userName = (() => {
      if (isSelfMessage || senderRepeated) return null;
      const name = sender.get('name');
      return <div className='message__username'>{name}</div>;
    }());

    return (
      <li className={cx('message', {
        'message_repeated': senderRepeated,
        'message_last': !nextMessageIsMain,
        'message_foreign': !isSelfMessage,
      })}>
        {isSelfMessage ? null : this.renderAvatar(sender)}
        {userName}
        <div className='message__cloud'>
          <div onClick={this.togglePin} style={{fontSize: '9px'}}>{this.props.pinned ? 'Отпинь' : 'Запинь'} мессагу без напряга!</div>
          <div className='message__text'>
            <Linkify properties={{className: 'message__url', target: '_blank'}}>{text}</Linkify>
          </div>
          <div className='message__date'>{this.state.date + ' ago'}</div>
        </div>
      </li>
    );
  }
}
