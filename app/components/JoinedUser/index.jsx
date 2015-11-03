import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';

import './styles.scss';

export default class JoinedUsers extends React.Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map).isRequired,
    changeToDirectChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }

  toDirectChannel = () => {
    this.props.changeToDirectChannel(this.props.user.get('id'));
  }

  render() {
    const {user, local} = this.props;
    const userView =
        user.get('id') === local.get('userId')
        ? <div className='joined-user joined-user_you'>
            <img className={cx('joined-user__avatar', {
              'joined-user_offline__avatar': !user.get('isOnline'),
            })}
              src={user.get('avatar')}
            />
            <div className={cx('joined-user__status', {
              'joined-user_offline__status': !user.get('isOnline'),
            })}></div>
          {user.get('name') + ' (you)'}
          </div>
        : <div className='joined-user' onClick={this.toDirectChannel}>
            <img className={cx('joined-user__avatar', {
              'joined-user_offline__avatar': !user.get('isOnline'),
            })}
              src={user.get('avatar')}
            />
            <div className={cx('joined-user__status', {
              'joined-user_offline__status': !user.get('isOnline'),
            })}></div>
          {user.get('name')}
          </div>;
    return (
      userView
    );
  }
}
