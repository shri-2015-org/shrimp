import React, {PropTypes} from 'react';
import {List} from 'immutable';
import cx from 'classnames';

import PinnedMessage from 'components/PinnedMessage';

import './styles.scss';

export default class PinnedMessages extends React.Component {
  static propTypes = {
    pinnedMessages: PropTypes.instanceOf(List).isRequired,
    containerClass: PropTypes.string,
  }

  render() {
    const {pinnedMessages, containerClass} = this.props;

    return (
      <div className={cx('pinned-messages', containerClass)}>
        <div className={cx('pinned-messages__header', containerClass + '__header')}>
          Pinned messages
          <div className={cx('pinned-messages__header__size', containerClass + '__header__size')}>
            {pinnedMessages.size}
          </div>
        </div>
        <div className={cx('pinned-messages__list', containerClass + '__body')}>
          <PinnedMessage
            messages={pinnedMessages}
          />
        </div>
      </div>
    );
  }
}
