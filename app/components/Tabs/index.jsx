import React, {PropTypes} from 'react';
import {List} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import Tab from 'components/Tab';

export default class Tabs extends React.Component {

  static propTypes = {
    currentTabId: PropTypes.number.isRequired,
    tabs: PropTypes.instanceOf(List),
    changeTab: PropTypes.func,
    className: PropTypes.string,
    tabClassName: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.currentTabId !== this.props.currentTabId;
  }

  render() {
    const {className, tabClassName, currentTabId, changeTab} = this.props;

    const tabWidth = (100 / this.props.tabs.size) + '%';
    const tabs = this.props.tabs.map((tab, i) => (
      <Tab
        className={tabClassName}
        key={i}
        id={tab.get('id')}
        name={tab.get('name')}
        isCurrent={(currentTabId === tab.get('id'))}
        changeTab={changeTab}
        width={tabWidth}
      />
    ));

    return (
      <div className={cx('tabs', {[className]: !!className})}>
        {tabs}
      </div>
    );
  }
}

