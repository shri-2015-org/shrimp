import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class Tab extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isCurrent: PropTypes.bool,
    name: PropTypes.string,
    changeTab: PropTypes.func,
    width: PropTypes.string,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isCurrent !== this.props.isCurrent;
  }

  changeTab = (e) => {
    e.preventDefault();
    this.props.changeTab(this.props.id);
  }

  render() {
    const {className, isCurrent, width} = this.props;
    return (
      <div
        className={cx('tabs__tab', {
          'tabs__tab_active': isCurrent,
          [className]: !!className,
        })}
        onClick={this.changeTab}
        style={{width: width}}
      >
        {this.props.name}
      </div>
    );
  }
}
