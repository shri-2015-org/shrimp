import React, {PropTypes} from 'react';
import IconSVG from 'svg-inline-loader/lib/component';
import cx from 'classnames';


export default class Star extends React.Component {

  static propTypes = {
    fill: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }


  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.fill === this.props.fill &&
      nextProps.className === this.props.className &&
      nextProps.onClick === this.props.onClick
    );
  }

  render() {
    const {fill} = this.props;
    return (
      <IconSVG
        {...this.props}
        className={cx('star-icon', this.props.className)}
        src={require(`./star${fill ? '_filled' : ''}.svg`)}
      />
    );
  }
}
