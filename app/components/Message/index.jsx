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
    messageId: PropTypes.string.isRequired,
    senderRepeated: PropTypes.bool.isRequired,
    nextMessageIsMain: PropTypes.bool.isRequired,
    sendEditedMessage: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);
    this.state = {
      date: null,
      isEdit: false,
    };
  }


  componentDidMount = () => {
    this.updateTime(this.props.timestamp);
    this.timer = setInterval(()=>{
      this.updateTime(this.props.timestamp);
    }, 5000);
  };


  componentWillUnmount = () => {
    clearInterval(this.timer);
  };


  updateTime = (timestamp) => {
    const date = moment.duration(moment().diff(moment(timestamp))).humanize();
    this.setState({
      date: date,
    });
  }


  editStart = () => {
    this.setState({
      isEdit: true,
    });
  };


  editEnd = () => {
    const newText = this.refs.editor.value;
    if (newText !== this.props.text) {
      this.props.sendEditedMessage({
        text: newText,
        edited: true,
        messageId: this.props.messageId,
      });
      this.setState({
        isEdit: false,
      });
    }
  };


  renderAvatar = (sender) => {
    return (
      <img
        className='message__avatar'
        src={sender.get('avatar')}
        width='50'
        height='50'
      />
    );
  };


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
          <div className='message__text'>
            <Linkify properties={{className: 'message__url', target: '_blank'}}>{text}</Linkify>
          </div>
          <div className='message__date'>{this.state.date + ' ago'}</div>
          <textarea
            defaultValue={text}
            hidden={!this.state.isEdit}
            className='message__editor'
            ref='editor'
          ></textarea>
          <button onClick={this.editStart}>edit</button>
          <button onClick={this.editEnd}>save</button>
        </div>
      </li>
    );
  }
}
