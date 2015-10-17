import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import './styles.scss';
import ChannelItem from 'components/ChannelItem';
import PeopleItem from 'components/PeopleItem';
import NewChannelItem from 'components/NewChannelItem';
import {Motion, spring} from 'react-motion';


@connect(state => ({
  messages: state.messages,
}))
export default class ThreadsList extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    markChannelAsRead: PropTypes.func.isRequired,
    getDirectChannelByUserId: PropTypes.func.isRequired,
    list: PropTypes.instanceOf(List),
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      animated: false,
    };
  }


  componentDidMount() {
    setTimeout(this.setState.bind(this, {animated: true}), 1);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.messages.size > this.props.messages.size) {
      const lastMessage = (nextProps.messages.toJS()[nextProps.messages.size - 1]);
      if (lastMessage.channelId === this.props.local.get('currentChannelId')) {
        this.props.markChannelAsRead({ channelId: this.props.local.get('currentChannelId'), lastSeen: new Date()});
      }
    }
    return true;
  }


  render() {
    const {
      local,
      messages,
      type,
      channels,
      getDirectChannelByUserId,
    } = this.props;

    const list = (() => {
      switch (type) {
      case 'Channels':
        const newChannelItem = interpolated => (
        <div style={{opacity: interpolated.x, transform: `translate(${interpolated.y}px, 0)`}}>
            <NewChannelItem
              {...this.props}
              channels={channels}
            />
          </div>
        );

        return this.props.list.map((listItem) => {
          if (listItem.get('isDirty')) {
            return (
              <Motion
                defaultStyle={{x: 0, y: 30}}
                style={{x: spring(this.state.animated ? 1 : 0), y: spring(this.state.animated ? 0 : 30)}}
                key={'dirty'}
              >
            {newChannelItem}
              </Motion>
            );
          }

          const thisChannelId = listItem.get('id');
          const lastSeen = listItem.get('lastSeen');
          const lastMessage = messages.findLast(m => m.get('channelId') === thisChannelId);
          const unreadCount = messages.filter(m => m.get('channelId') === thisChannelId && Date.parse(m.get('timestamp')) > Date.parse(lastSeen)).size;

          return (
            <ChannelItem
              {...this.props}
              key={thisChannelId}
              item={listItem}
              lastMessage={lastMessage}
              unreadCount={unreadCount}
              isCurrent={local.get('currentChannelId') === thisChannelId}
              local={local}
            />
          );
        });


      case 'People':
        return this.props.list.map((listItem) => {
          const thisContactId = listItem.get('id');
          const directChannel = getDirectChannelByUserId(thisContactId);
          const lastSeen = directChannel ? directChannel.get('lastSeen') : null;
          const unreadCount = !lastSeen ? 0 : messages.filter(m => m.get('channelId') === directChannel.get('id') && Date.parse(m.get('timestamp')) >= Date.parse(lastSeen)).size;
          const lastDirectMessage = messages.findLast(m => getDirectChannelByUserId(thisContactId) ? m.get('channelId') === getDirectChannelByUserId(thisContactId).get('id') : undefined);
          return (
            <PeopleItem
              {...this.props}
              key={thisContactId}
              item={listItem}
              lastMessage={lastDirectMessage}
              currentChannelId={local.get('currentChannelId')}
              isCurrent={directChannel && local.get('currentChannelId') === directChannel.get('id')}
              unreadCount={unreadCount}
              directChannel={directChannel}
            />
          );
        });

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
