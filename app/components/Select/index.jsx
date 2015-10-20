import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class Select extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.array,
  }

  render() {
    const classes = cx('select', this.props.className);

    return (
      <select {...this.props} className={classes}>
      	{this.props.children}
      </select>
    );
  }
}
