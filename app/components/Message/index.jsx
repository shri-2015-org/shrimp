import React, {PropTypes} from 'react';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    senderId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
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
    const {text, senderId, userId, userName, users} = this.props;
    const type = senderId === userId ? '' : 'message__cloud_other';
    const name = senderId === userId
      ? userName
      : users.find((item) => item.id === senderId).name;
    return (
      <li className='message'>
        {senderId === userId ? null : this.renderAvatar()}
        <div className={'message__cloud ' + type}>
          <div className='message__text'>
            <strong>{name + ':'}</strong><br/>
            {text}
          </div>
        </div>
      </li>
    );
  }
}
