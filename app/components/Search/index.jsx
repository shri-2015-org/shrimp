import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    iconClassName: PropTypes.string,
    filter: PropTypes.func,
  }


  render() {
    const {inputClassName, iconClassName} = this.props;
    const classes = cx('search', this.props.className);
    return (
      <div className={classes}>
        <div
          className={cx('search__icon', iconClassName)}
        >{'⚲'}</div>
        <input
          placeholder='Search...'
          type='text'
          onChange={this.props.filter}
          {...this.props}
          className={cx('search__input', inputClassName)}
        />
      </div>
    );
  }
}
