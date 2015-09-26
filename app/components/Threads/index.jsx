import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import './styles.scss';
import ThreadsHeader from 'components/ThreadsHeader';
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
      currentTab: 'Channels',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
              Immutable.is(nextProps.channels, this.props.channels) &&
              Immutable.is(nextProps.users, this.props.users) &&
              Immutable.is(nextProps.local, this.props.local) &&
              Immutable.is(nextState.currentTab, this.state.currentTab)
            );
  }

  changeTab = (tabName) => {
    this.setState({
      currentTab: tabName,
    });
  };


  render() {
    const {channels, users, setCurrentChannel, local} = this.props;

    const tabs = List.of(
      Map({ name: 'People', list: users }),
      Map({ name: 'Channels', list: channels }),
    );

    const currentTabData = tabs.find(tab => tab.get('name') === this.state.currentTab);

    return (
      <div className='threads'>
        <ThreadsHeader
          tabs={tabs}
          currentTab={this.state.currentTab}
          changeTab={this.changeTab}
        />
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
