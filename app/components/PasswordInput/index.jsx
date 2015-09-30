import React, {PropTypes} from 'react';
import cx from 'classnames';
import Input from 'components/Input';

import './styles.scss';


export default class PasswordInput extends Input {

  static propTypes = {
    className: PropTypes.string,
  }


  static defaultProps = {
    placeholder: 'Password',
  }


  render() {
    const classes = cx('input', 'input_type_password', this.props.className);
    return (
      <Input {...this.props} className={classes} type='password' />
    );
  }
}
