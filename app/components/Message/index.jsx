import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    sender: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
  }


  renderAvatar = (sender) => {
    return (
      <div className='message__avatar'>
        <img
          src={sender.avatar}
          width='50'
          height='50'
        />
      </div>
    );
  }


  render() {
    const {sender, text, currentUserId} = this.props;
    const isSelfMessage = sender.id === currentUserId;

    return (
      <li className='message'>
        {isSelfMessage ? null : this.renderAvatar(sender)}
        <div className={cx('message__cloud', {message__cloud_other: !isSelfMessage})}>
          <div className='message__text'>
            <strong>{sender.name + ':'}</strong>
            <br />
            {text}
          </div>
        </div>
      </li>
    );
  }
}
