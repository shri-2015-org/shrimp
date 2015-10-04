import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import UnreadCounter from 'components/UnreadCounter';
import './styles.scss';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Map),
    isCurrent: PropTypes.bool,
    isOnline: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    return !(
      Immutable.is(nextProps.isOnline, this.props.isOnline) &&
      Immutable.is(nextProps.item, this.props.item)
    );
  }

  render() {
    return (
      <div
        className={cx('person', {
          'person_active': this.props.isCurrent,
        })}
        onClick={this.setChannel}
      >
        <div className='person__name'>{this.props.item.get('name')}</div>
        <div className='person__last-message'>
          Commodi sed consequatur et deserunt molestias. Velit cupiditate laudantium
          exercitationem error et at. Doloribus voluptatem sint libero enim at et.
          </div>
        <UnreadCounter
          className='person__unread-counter'
          count={this.props.item.get('unreadMessagesCount')}
        />
      </div>
    );
  }
}
