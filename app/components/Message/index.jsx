import React, {PropTypes} from 'react';
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
    const type = message.senderId === local.userId ? '' : 'message__cloud_other';
    return (
      <li className='message'>
        {message.senderId === local.userId ? null : this.renderAvatar()}
        <div className={'message__cloud ' + type}>
          <div className='message__text'>
            <strong>{message.sender.name + ':'}</strong><br/>
            {message.text}
          </div>
        </div>
      </li>
    );
  }
}
