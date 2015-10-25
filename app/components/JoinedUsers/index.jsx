import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import IconSVG from 'svg-inline-loader/lib/component';
import cx from 'classnames';
import JoinedUser from 'components/JoinedUser';

import './styles.scss';

export default class JoinedUsers extends React.Component {
  static propTypes = {
    joinedUsers: PropTypes.instanceOf(List).isRequired,
    containerClass: PropTypes.string,
    changeToDirectChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }


  toggleSection = () => {
    this.setState({
      opened: !this.state.opened,
    });
  }

  comparator = (user1, user2) => {
    const onlineDiff = user2.get('isOnline') - user1.get('isOnline');

    if (onlineDiff === 0) {
      return user2.get('name').toLowerCase() > user1.get('name').toLowerCase() ? -1 : 1;
    }

    return onlineDiff;
  }

  render() {
    const {joinedUsers, containerClass, changeToDirectChannel, local} = this.props;

    return (
      <div className={cx('joined-users', containerClass)}>
        <div className={cx(
          'joined-users__header',
          containerClass + '__header', {
            'channel-info__section__header_open': this.state.opened,
          }
        )}
          onClick={this.toggleSection}>
          <IconSVG
            className={cx('joined-users__icon', containerClass + '__icon')}
            src={require(`./user.inline.svg`)}
          />
        Joined users
          <div className={cx('joined-users__header__size', containerClass + '__header__size')}>
            <div className='joined-users__header_online'>{joinedUsers.count(u => u.get('isOnline'))}</div> / {joinedUsers.size}
          </div>
        </div>
        <div className={cx(
          'joined-users__list',
          containerClass + '__body', {
            'channel-info__section__body_open': this.state.opened,
          }
        )}>
          <div>
            {joinedUsers.sort(this.comparator).map((user, i) => (
              <JoinedUser
                local={local}
                user={user}
                key={i}
                changeToDirectChannel={changeToDirectChannel}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
