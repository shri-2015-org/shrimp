import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    sender: PropTypes.instanceOf(Map).isRequired,
    text: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
  }

  shouldComponentUpdate = () => true

  renderAvatar = (sender) => {
    return (
      <div className='message__avatar'>
        <img
          className='message_img'
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
        </div>
      </li>
    );
  }
}
