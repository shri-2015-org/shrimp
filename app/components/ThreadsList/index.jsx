import React, {PropTypes} from 'react';
import './styles.scss';
import ChannelItem from 'components/ChannelItem';
import PeopleItem from 'components/PeopleItem';

export default class ThreadsList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(React.PropTypes.object),
    setCurrentChannel: PropTypes.func.isRequired,
    type: PropTypes.string,
    local: PropTypes.object.isRequired,
  };

  render() {
    const channelsListItems = this.props.list.map((listItem, index) => (
      <ChannelItem
        item={listItem}
        key={index}
        isCurrent={this.props.local.currentChannelId === listItem.id}
        setCurrentChannel={this.props.setCurrentChannel}
      />
    ));
    const peopleListItems = this.props.list.map((listItem, index) => (
      <PeopleItem item={listItem} key={index} />
    ));

    return (
      <ul className='threads-list'>
        {this.props.type === 'channels'
          ? channelsListItems
          : null}
        {this.props.type === 'people'
          ? peopleListItems
          : null}
      </ul>
    );
  }
}
