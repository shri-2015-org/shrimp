import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    message: PropTypes.object.isRequired,
    local: PropTypes.object.isRequired,
  }


  renderAvatar = () => {
    return (
      <div className='message__avatar'>
        <img
          src={'http://www.sc2mapster.com/media/avatars/6/482/Nova.png'} // test img
          width='50'
          height='50'
          />
      </div>
    );
  }


  render() {
    const {message, local} = this.props;
    const isSelfMessage = message.senderId === local.userId;
    return (
      <li className='message'>
        {isSelfMessage ? null : this.renderAvatar()}
        <div className={cx('message__cloud', {message__cloud_other: !isSelfMessage})}>
          <div className='message__text'>
            <strong>{message.sender.name + ':'}</strong><br/>
            {message.text}
          </div>
        </div>
      </li>
    );
  }
}
