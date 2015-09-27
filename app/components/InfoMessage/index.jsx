import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';


export default class InfoMessage extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
  }

  render() {
    const {type, className} = this.props;
    const classes = cx(
      [className],
      'info-message',
      {
        'info-message_type_warning': type === 'warning',
        'info-message_type_error': type === 'error',
        'info-message_type_success': type === 'success',
      }
    );

    return (
      <div className={classes}>
        <div className='info-message__text'>{this.props.children}</div>
      </div>
    );
  }
}
