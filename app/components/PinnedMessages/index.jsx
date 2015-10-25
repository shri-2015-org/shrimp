import React, {PropTypes} from 'react';
import {List} from 'immutable';
import IconSVG from 'svg-inline-loader/lib/component';
import cx from 'classnames';

import PinnedMessage from 'components/PinnedMessage';

import './styles.scss';

export default class PinnedMessages extends React.Component {
  static propTypes = {
    pinnedMessages: PropTypes.instanceOf(List).isRequired,
    containerClass: PropTypes.string,
    unpinMessage: PropTypes.func.isRequired,
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

  render() {
    const {pinnedMessages, containerClass} = this.props;

    return (
      <div className={cx('pinned-messages', containerClass)}>
        <div className={cx(
            'pinned-messages__header',
            containerClass + '__header', {
              'channel-info__section__header_open': this.state.opened,
            }
          )}
          onClick={this.toggleSection}>
          <IconSVG
            className={cx('pinned-messages__icon', containerClass + '__icon')}
            src={require(`./pinned.inline.svg`)}
          />
          Pinned messages
          <div className={cx('pinned-messages__header__size', containerClass + '__header__size')}>
            {pinnedMessages.size}
          </div>
        </div>
        <div className={cx(
          'pinned-messages__list',
          containerClass + '__body', {
            'channel-info__section__body_open': this.state.opened,
          }
        )}>
          <div>
            {pinnedMessages.map((message, i) => (
              <PinnedMessage
                message={message}
                key={i}
                unpinMessage={this.props.unpinMessage}
              />))}
          </div>
        </div>
      </div>
    );
  }
}
