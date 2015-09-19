import React, {PropTypes} from 'react';
import './styles.scss';
import ChannelItem from 'components/ChannelItem';
import PeopleItem from 'components/PeopleItem';

export default class ThreadsList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(React.PropTypes.object),
    activeChannelId: PropTypes.number,
    type: PropTypes.string,
  };

  render() {
    const channelsListItems = this.props.list.map((listItem, index) => (
      <ChannelItem item={listItem} key={index} isCurrent={this.props.activeChannelId === listItem.id}/>
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
