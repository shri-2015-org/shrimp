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

  static contextTypes = {
    __: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.currentTabId !== this.props.currentTabId)
      || (nextContext.__.messages !== this.context.__.messages);
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

