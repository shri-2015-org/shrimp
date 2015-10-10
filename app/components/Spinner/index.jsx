import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class Spinner extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
  }

  render() {
    const classes = cx('spinner', this.props.className);
    const show = this.props.show;
    const spinner = <div className={classes} />;
    return (
       show ? spinner : null
    );
  }
}
