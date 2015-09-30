import React, {PropTypes} from 'react';
import cx from 'classnames';

import './styles.scss';


export default class Button extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const classes = cx('button', this.props.className);
    return (
      <button {...this.props} className={classes}>
        {this.props.children}
      </button>
    );
  }
}
