import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class Input extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const classes = cx('input', this.props.className);

    return (
      <input {...this.props} className={classes} />
    );
  }
}
