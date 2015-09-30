import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import cx from 'classnames';
import './styles.scss';


export default class Tab extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    isCurrent: PropTypes.bool,
    changeTab: PropTypes.func,
    width: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string,
    children: PropTypes.node,
  }


  constructor(props) {
    super(props);
  }


  shouldComponentUpdate(nextProps) {
    return nextProps.isCurrent !== this.props.isCurrent;
  }


  changeTab = () => {
    this.props.changeTab(this.props.id);
  }


  render() {
    const {className, isCurrent, width} = this.props;
    const tab = (
      <div
        className={cx('tabs__tab', {
          'tabs__tab_active': isCurrent,
          [className]: !!className,
        })}
        onClick={this.changeTab}
        style={{width: width}}
      >
        {this.props.children}
      </div>
    );

    if (this.props.link) {
      return <Link to={this.props.link}>{tab}</Link>;
    }
    return tab;
  }
}
