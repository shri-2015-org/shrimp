import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class UnreadCounter extends React.Component {

  static propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
  }

  render() {
    return (
      <span
        {...this.props}
        className={cx('unread-counter', this.props.className, {
          'unread-counter_empty': this.props.count === 0,
        })}
      >
        {this.props.count}
      </span>
    );
  }
}
