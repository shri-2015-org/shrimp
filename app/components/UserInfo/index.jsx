import React, {PropTypes} from 'react';
import {Map} from 'immutable';

import './styles.scss';

export default class UserInfo extends React.Component {
  static propTypes = {
    currentChannel: PropTypes.instanceOf(Map).isRequired,
  }

  render() {
    const {currentChannel} = this.props;
    return (
      <div className='user-info'>
        <img className='user-info__avatar' src={currentChannel.get('avatar')}/>
        <div className='user-info__title'>Email</div>
        <div className='user-info__desc'>{currentChannel.get('email')}</div>
      </div>
    );
  }

}
