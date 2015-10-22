import React, {PropTypes, cloneElement} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {currentChannelSelector} from 'selectors/currentChannelSelector';

import './styles.scss';


@connect(state => ({
  currentChannel: currentChannelSelector(state),
}))

export default class Tabs extends React.Component {

  static propTypes = {
    currentTabId: PropTypes.number,
    changeTab: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.currentChannel.get('name') !== nextProps.currentChannel.get('name')) {
      this.props.changeTab(nextProps.currentChannel.get('isDirect') ? 1 : 2);
    }
    return nextProps.currentTabId !== this.props.currentTabId;
  }

  render() {
    const {className, currentTabId, changeTab} = this.props;
    const children = [].concat(this.props.children);
    const tabWidth = `${100 / children.length}%`;

    const getChildren = () => {
      return children.map((tabElement, i) => {
        return cloneElement(tabElement, {
          isCurrent: currentTabId === tabElement.props.id,
          width: tabWidth,
          key: i,
          changeTab,
        });
      });
    };


    return (
      <div className={cx('tabs', className)}>
        {getChildren()}
      </div>
    );
  }
}

