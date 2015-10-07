import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    filter: PropTypes.func,
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
          onChange={this.props.filter}
          {...this.props}
          className={cx('search__input', inputClassName)}
        />
      </div>
    );
  }
}
