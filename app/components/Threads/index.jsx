import React, {PropTypes} from 'react';
import './styles.scss';
import ThreadsHeader from 'components/ThreadsHeader';
import ThreadsList from 'components/ThreadsList';
import {List, Map} from 'immutable';


export default class ThreadsSection extends React.Component {

  static propTypes = {
    channels: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    setCurrentChannel: PropTypes.func.isRequired,
    local: PropTypes.object.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Channels',
    };
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
