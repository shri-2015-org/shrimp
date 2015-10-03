import React, {PropTypes} from 'react';
import './styles.scss';
import cx from 'classnames';

export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
  }


  render() {
    const {inputClassName} = this.props;
    const classes = cx('search', this.props.className);
    return (
      <div className={classes}>
        <div
          className='search__icon'
        >{'⚲'}</div>
        <input
          placeholder='Search...'
          type='text'
          {...this.props}
          className={cx('search__input', inputClassName)}
        />
      </div>
    );
  }
}
