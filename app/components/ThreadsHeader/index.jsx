import React, {PropTypes} from 'react';
import Immutable, {List} from 'immutable';
import './styles.scss';
import Tab from 'components/ThreadsHeaderTab';

export default class ThreadsHeader extends React.Component {

  static propTypes = {
    tabs: PropTypes.instanceOf(List),
    currentTab: PropTypes.string,
    changeTab: React.PropTypes.func,
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.currentTab, this.props.currentTab);
  }

  render() {
    const tabs = this.props.tabs.map((tab, i) => (
      <Tab name={tab.get('name')}
        key={i}
        isCurrent={(this.props.currentTab === tab.get('name'))}
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

