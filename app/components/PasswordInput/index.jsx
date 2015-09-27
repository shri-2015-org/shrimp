import React from 'react';
import Input from 'components/Input';

import './styles.scss';


export default class PasswordInput extends Input {

  static defaultProps = {
    placeholder: 'password',
  }


  render() {
    return (
      <Input {...this.props} className='input_type_password' type='password' />
    );
  }
}
