import React, {PropTypes} from 'react';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    user: PropTypes.number.isRequired,
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
    const {text, user} = this.props;
    const currentUser = Math.round(Math.random()); // dummy for test message type
    const type = user === currentUser ? '' : 'message__cloud_other';
    return (
      <li className='message'>
        {user === currentUser ? null : this.renderAvatar()}
        <div className={'message__cloud ' + type}>
          <div className='message__text'>
            {text}
          </div>
        </div>
      </li>
    );
  }
}
