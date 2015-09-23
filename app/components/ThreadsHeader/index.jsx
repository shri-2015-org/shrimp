import React, {PropTypes} from 'react';
import './styles.scss';
import Tab from 'components/ThreadsHeaderTab';

export default class ThreadsHeader extends React.Component {

  static propTypes = {
    tabs: PropTypes.arrayOf(React.PropTypes.object),
    currentTab: PropTypes.string,
    changeTab: React.PropTypes.func,
  }


  render() {
    const tabs = this.props.tabs.map(tab => (
      <Tab name={tab.name}
        isCurrent={(this.props.currentTab === tab.name)}
        changeTab={this.props.changeTab}
      />
    ));

    return (
      <div className='threads-header'>
        {tabs}
      </div>
    );
  }
}

