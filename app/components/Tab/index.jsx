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

  static contextTypes = {
    __: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.isCurrent !== this.props.isCurrent)
      || (nextContext.__.messages !== this.context.__.messages);
  }


  changeTab = () => {
    this.props.changeTab(this.props.id);
  }


  render() {
    const {className, isCurrent, width} = this.props;

    const properties = {
      className: cx('tabs__tab', {
        'tabs__tab_active': isCurrent,
        [className]: !!className,
      }),
      onClick: this.changeTab,
      style: {width: width},
    };

    if (this.props.link) {
      return (
        <Link {...properties} to={this.props.link}>
          {this.props.children}
        </Link>
      );
    }
    return <div {...properties}>{this.props.children}</div>;
  }
}
