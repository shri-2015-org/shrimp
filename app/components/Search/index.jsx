import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Map} from 'immutable';
import './styles.scss';


export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    currentData: PropTypes.instanceOf(Map),
    inputClassName: PropTypes.string,
    sendToServer: PropTypes.bool,
    filterData: PropTypes.object,
    filter: PropTypes.func,
  }


  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      oldData: '',
      typeDictionary: {
        'channels': 'CHANNELS',
        'people': 'USERS',
      },
    };
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
          onChange={this.props.currentData ? this.props.filter : null}
          {...this.props}
          className={cx('search__input', inputClassName)}
        />
      </div>
    );
  }
}
