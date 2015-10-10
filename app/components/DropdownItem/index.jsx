import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class DropdownItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    danger: PropTypes.bool,
  }

  render() {
    const {children, onClick, danger} = this.props;
    return (
      <li
        onClick={onClick}
        className={cx('dropdown-item', { 'dropdown-item_danger': danger})}
      >{children}</li>
    );
  }
}
