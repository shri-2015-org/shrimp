import React, {PropTypes} from 'react';
import './styles.scss';
import Tab from 'components/ThreadsHeaderTab';

export default class ThreadsHeader extends React.Component {

  static propTypes = {
    tabs: PropTypes.arrayOf(React.PropTypes.object),
    currentTab: PropTypes.string,
    changeTab: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  handleClick = (tab) => {
    this.props.changeTab(tab);
  }

  render() {
    return (
      <div className='threads-header'>
      {this.props.tabs.map(tab => (
          <Tab name={tab.name}
            isCurrent={(this.props.currentTab === tab.id)}
            handleClick={this.handleClick.bind(this, tab)} />
        ))}
      </div>
    );
  }
}

