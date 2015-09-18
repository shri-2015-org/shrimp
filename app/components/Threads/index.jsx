import React from 'react';
import './styles.scss';
import ThreadsHeader from 'components/ThreadsHeader';

const peopleTab = { id: 0, name: 'People' };
const channelsTab = { id: 1, name: 'Channels' };

const tabs = [
  peopleTab,
  channelsTab,
];

export default class ThreadsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: peopleTab.id,
    };
  }

  changeTab = (tab) => {
    this.setState({ currentTab: tab.id });
  }

  render() {
    return (
      <div className='threads'>
        <ThreadsHeader tabs={tabs} changeTab={this.changeTab} currentTab={this.state.currentTab} />
        {this.state.currentTab === peopleTab.id
          ? <div>people will be here</div>
          : null}
        {this.state.currentTab === channelsTab.id
          ? <div>channels will be here</div>
          : null}
      </div>
    );
  }
}
