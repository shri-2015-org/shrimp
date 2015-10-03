import React, {PropTypes, cloneElement} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class Tabs extends React.Component {

  static propTypes = {
    currentTabId: PropTypes.number,
    changeTab: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.currentTabId !== this.props.currentTabId;
  }

  render() {
    const {className, currentTabId, changeTab} = this.props;
    const tabWidth = (100 / this.props.children.length) + '%';

    const children = this.props.children.map((tabElement, i) => {
      return cloneElement(tabElement, {
        isCurrent: currentTabId === tabElement.props.id,
        width: tabWidth,
        key: i,
        changeTab,
      });
    });

    return (
      <div className={cx('tabs', {[className]: !!className})}>
        {children}
      </div>
    );
  }
}

