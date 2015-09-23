import React, {PropTypes} from 'react';
import './styles.scss';
import ThreadsHeader from 'components/ThreadsHeader';
import ThreadsList from 'components/ThreadsList';

const peopleTab = { id: 0, name: 'People' };
const channelsTab = { id: 1, name: 'Channels' };

const tabs = [
  peopleTab,
  channelsTab,
];


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
      currentTab: peopleTab.id,
    };
  }


  changeTab = (tab) => {
    this.setState({ currentTab: tab.id });
  };

  render() {
    const {channels, users, setCurrentChannel, local} = this.props;
    return (
      <div className='threads'>
        <ThreadsHeader tabs={tabs} changeTab={this.changeTab} currentTab={this.state.currentTab} />
        {this.state.currentTab === peopleTab.id
          ? <ThreadsList list={users} local={local} setCurrentChannel={setCurrentChannel} type={'people'}/>
          : null}
        {this.state.currentTab === channelsTab.id
          ? <ThreadsList list={channels} local={local} setCurrentChannel={setCurrentChannel} type={'channels'}/>
          : null}
      </div>
    );
  }
}
