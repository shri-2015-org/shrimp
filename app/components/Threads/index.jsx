import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import './styles.scss';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import ThreadsList from 'components/ThreadsList';


export default class ThreadsSection extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    setCurrentChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.channels, this.props.channels) &&
      Immutable.is(nextProps.users, this.props.users) &&
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextState.currentTabId, this.state.currentTabId)
    );
  }

  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  };


  render() {
    const {channels, users, setCurrentChannel, local} = this.props;

    const tabs = List.of(
      Map({id: 1, name: 'People', list: users }),
      Map({id: 2, name: 'Channels', list: channels }),
    );

    const currentTabData = tabs.find(tab => tab.get('id') === this.state.currentTabId);

    return (
      <div className='threads'>
        <Tabs
          currentTabId={this.state.currentTabId}
          changeTab={this.changeTab}
        >
          <Tab id={1} name='People' />
          <Tab id={2} name='Channels' />
        </Tabs>
        <ThreadsList
          list={currentTabData.get('list')}
          local={local}
          setCurrentChannel={setCurrentChannel}
          type={currentTabData.get('name')}
        />

      </div>
    );
  }
}
