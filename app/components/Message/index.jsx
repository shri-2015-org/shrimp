import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import moment from 'moment';
import Linkify from 'react-linkify';
import Textarea from 'react-textarea-autosize';

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
      editorHeight: 0,
      editorWidth: 0,
    };
  }


  componentDidMount = () => {
    this.updateTime(this.props.timestamp);
    this.timer = setInterval(()=>{
      this.updateTime(this.props.timestamp);
    }, 5000);
  };


  componentDidUpdate = () => {
    if (this.state.isEdit) {
      this.refs.editor.focus();
    }
  };


  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  updateTime = (timestamp) => {
    const date = moment.duration(moment().diff(moment(timestamp))).humanize();
    this.setState({
      date: date,
    });
  };


  editStart = () => {
    const textCloud = window.getComputedStyle(this.refs.text);
    this.setState({
      isEdit: true,
      editorHeight: textCloud.height,
      editorWidth: textCloud.width,
    });
  };


  editEnd = () => {
    const newText = this.refs.editor.value.trim();
    if (newText !== this.props.text) {
      this.props.sendEditedMessage({
        text: newText,
        edited: true,
        messageId: this.props.messageId,
      });
    }
    this.setState({
      isEdit: false,
    });
  };


  editorKeyPress = (e) => {
    if (e.which === 13) {
      this.editEnd();
    }
  };


  cancelEdit = () => {
    this.setState({
      isEdit: false,
    });
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
          {(isSelfMessage && !this.state.isEdit)
            ? <div className='message__edit'>
                <a
                  onClick={this.editStart}
                  className='message__edit-btn'>{'✎'}</a>
              </div>
            : null }
          <div className='message__text' ref='text'>
            <div hidden={this.state.isEdit}>
              <Linkify properties={{className: 'message__url', target: '_blank'}}>{text}
              </Linkify>
            </div>
            <Textarea
              defaultValue={text}
              hidden={!this.state.isEdit}
              onKeyPress={this.editorKeyPress}
              className='message__editor'
              ref='editor'
              minRows={2}
              maxRows={10}
              style={{width: this.state.editorWidth, height: this.state.editorHeight}}
            />
          </div>
          <div
            className='message__save-btn'
            hidden={!this.state.isEdit}
            onClick={this.editEnd}
          >{'enter to '}<u>{'save'}</u>{' changes'}</div>
          <div
            className='message__cancel-btn'
            hidden={!this.state.isEdit}
            onClick={this.cancelEdit}
          >{'esc to '}<u>{'cancel'}</u></div>
          <div
            className='message__date'
            hidden={this.state.isEdit}
          >{this.state.date + ' ago'}</div>
        </div>
        <button onClick={this.editStart}>edit</button>
        <button onClick={this.editEnd}>save</button>
      </li>
    );
  }
}
