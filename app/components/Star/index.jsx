import React, {PropTypes} from 'react';
import IconSVG from 'svg-inline-loader/lib/component';
import cx from 'classnames';


export default class Star extends React.Component {

  static propTypes = {
    fill: PropTypes.bool,
    className: PropTypes.string,
  }


  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.fill === this.props.fill &&
      nextProps.className === this.props.className
    );
  }

  render() {
    const {fill} = this.props;
    return (
      <IconSVG
        className={cx('star-icon', this.props.className)}
        src={require(`./star${fill ? '_filled' : ''}.svg`)}
      />
    );
  }
}
