import React, {PropTypes} from 'react';
import cx from 'classnames';
import store from 'store';
import {Map} from 'immutable';
import {filterChannels} from 'actions/channels';
import './styles.scss';


export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    list: PropTypes.instanceOf(Map),
    inputClassName: PropTypes.string,
  }


  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      oldData: '',
    };
  }


  filter = (e) => {
    if (this.state.filterText !== '' && e.target.value === '') {
      this.setState({
        filterText: e.target.value,
        oldData: '',
      });
      store.dispatch(filterChannels(this.state.oldData));
    } else {
      if (this.state.filterText === '' && e.target.value !== '') {
        this.setState({
          filterText: e.target.value,
          oldData: this.props.list.get('list'),
        });
      } else {
        this.setState({
          filterText: e.target.value,
        });
      }
      const channels = this.state.oldData.filter((listItem) => {
        if (listItem.get('name').indexOf(e.target.value) !== -1) {
          return listItem;
        }
      });
      store.dispatch(filterChannels(channels));
    }
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
          onChange={this.filter}
          {...this.props}
          className={cx('search__input', inputClassName)}
        />
      </div>
    );
  }
}
