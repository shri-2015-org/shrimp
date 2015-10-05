import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class DropdownItem extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    danger: PropTypes.bool,
  }

  render() {
    const {text, onClick, danger} = this.props;
    return (
      <li
        onClick={onClick}
        className={cx('dropdown-item', { 'dropdown-item_danger': danger})}
      >{text}</li>
    );
  }
}
