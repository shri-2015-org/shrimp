import React, {PropTypes} from 'react';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    user: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }


  render() {
    const {text, user} = this.props;
    // const currentUser = 0; // dummy for test message type
    const currentUser = Math.round(Math.random()); // dummy for test message type
    const type = user === currentUser ? '' : 'message_other';
    return (
      <li className='clearfix'>
        <div className={'message ' + type}>
          <div className='message__text-item'>
            {text}
          </div>
        </div>
      </li>
    );
  }
}
