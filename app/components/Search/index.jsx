import React, {PropTypes} from 'react';
import cx from 'classnames';
import store from 'store';
import {Map} from 'immutable';
import {filter} from 'actions/local';
import './styles.scss';


export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    currentData: PropTypes.instanceOf(Map),
    inputClassName: PropTypes.string,
    sendToServer: PropTypes.bool,
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


  filter = (e) => {
    const tabName = this.props.currentData.get('name').toLowerCase();
    const filterType = tabName ? this.state.typeDictionary[tabName] : '';
    if (filterType) {
      if (!this.props.sendToServer) {
        if (this.state.filterText !== '' && e.target.value === '') {
          this.setState({
            filterText: e.target.value,
            oldData: '',
          });
          store.dispatch(filter(filterType, this.state.oldData));
        } else {
          if (this.state.filterText === '' && e.target.value !== '') {
            this.setState({
              filterText: e.target.value,
              oldData: this.props.currentData.get('list'),
            });
            const channels = this.props.currentData.get('list').filter((listItem) => {
              if (listItem.get('name').indexOf(e.target.value) !== -1) {
                return listItem;
              }
            });
            store.dispatch(filter(filterType, channels));
          } else {
            this.setState({
              filterText: e.target.value,
            });
            const channels = this.state.oldData.filter((listItem) => {
              if (listItem.get('name').indexOf(e.target.value) !== -1) {
                return listItem;
              }
            });
            store.dispatch(filter(filterType, channels));
          }
        }
      }
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
          onChange={this.props.currentData ? this.filter : null}
          {...this.props}
          className={cx('search__input', inputClassName)}
        />
      </div>
    );
  }
}
