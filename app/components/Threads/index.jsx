import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import './styles.scss';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import ThreadsList from 'components/ThreadsList';
import Search from 'components/Search';


export default class Threads extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    replaceDirtyChannel: PropTypes.func.isRequired,
    setFavoriteChannel: PropTypes.func.isRequired,
    setCurrentChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    markChannelAsRead: PropTypes.func.isRequired,
    newChannel: PropTypes.func.isRequired,
    addDirtyChannel: PropTypes.func.isRequired,
    removeDirtyChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 2,
      filterValue: '',
    };
  }


  componentDidMount = () => {
    const threadsWrapper = this.refs.threads.getDOMNode().parentNode;
    threadsWrapper.style.overflowX = 'hidden';
    window.addEventListener('keydown', this.removeDirtyChannel);
  };


  shouldComponentUpdate = (nextProps, nextState) => {
    return !(
      Immutable.is(nextProps.channels, this.props.channels) &&
      Immutable.is(nextProps.contacts, this.props.contacts) &&
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextState.currentTabId, this.state.currentTabId) &&
      Immutable.is(nextState.filterValue, this.state.filterValue)
    );
  };


  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.removeDirtyChannel);
  };


  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  };


  addDirtyChannel = () => {
    const threadsWrapper = this.refs.threads.getDOMNode().parentNode;
    threadsWrapper.scrollTop = 0;
    this.props.addDirtyChannel();
  };


  removeDirtyChannel = (e) => {
    if (e.keyCode === 27) {
      this.props.removeDirtyChannel();
    }
  };


  changeFilterValue = (e) => {
    this.setState({
      filterValue: e.target.value,
    });
  };


  render() {
    const {
      channels,
      contacts,
      setCurrentChannel,
      local,
      replaceDirtyChannel,
      newChannel,
      joinToChannel,
      setFavoriteChannel,
      markChannelAsRead,
    } = this.props;

    const tabs = List.of(
      Map({id: 1, name: 'People', sendToServer: false, list: contacts }),
      Map({id: 2, name: 'Channels', sendToServer: false, list: channels }),
    );

    const currentTabData = tabs.find(tab => tab.get('id') === this.state.currentTabId);

    const filterData = currentTabData.get('list').filter(listItem => {
      return listItem.get('isDirty') || listItem.get('name').indexOf(this.state.filterValue) !== -1;
    });

    return (
      <div className='threads' ref='threads'>
        <Tabs
          currentTabId={this.state.currentTabId}
          changeTab={this.changeTab}
          className='threads__tabs'
        >
          <Tab id={2}>Channels</Tab>
        </Tabs>

        <ThreadsList
          list={filterData}
          local={local}
          channels={channels}
          setCurrentChannel={setCurrentChannel}
          setFavoriteChannel={setFavoriteChannel}
          replaceDirtyChannel={replaceDirtyChannel}
          newChannel={newChannel}
          type={currentTabData.get('name')}
          joinToChannel={joinToChannel}
          markChannelAsRead={markChannelAsRead}
        />
        <div className='treads-bottom'>
          <Search
            onChange={this.changeFilterValue}
            sendToServer={false}
            className='threads__search'
            inputClassName='threads__search__input'
            iconClassName='threads__search__icon'
          />
          <button
            onClick={this.addDirtyChannel}
            className='add-channel-button'
          ></button>
        </div>
      </div>
    );
  }
}
