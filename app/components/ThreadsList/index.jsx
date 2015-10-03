import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import './styles.scss';
import ChannelItem from 'components/ChannelItem';
import PeopleItem from 'components/PeopleItem';

export default class ThreadsList extends React.Component {

  static propTypes = {
    list: PropTypes.instanceOf(List),
    setCurrentChannel: PropTypes.func.isRequired,
    type: PropTypes.string,
    local: PropTypes.instanceOf(Map).isRequired,
  };


  render() {
    const list = (() => {
      switch (this.props.type) {
      case 'Channels':
        return this.props.list.map((listItem, index) => (
          <ChannelItem
            item={listItem}
            key={index}
            isCurrent={this.props.local.get('currentChannelId') === listItem.get('id')}
            setCurrentChannel={this.props.setCurrentChannel}
          />
        ));

      case 'People':
        return this.props.list.map((listItem, index) => (
          <PeopleItem item={listItem} key={index} />
        ));

      default:
        return null;
      }
    }());


    return (
      <ul className='threads-list'>
        {list}
      </ul>
    );
  }
}
