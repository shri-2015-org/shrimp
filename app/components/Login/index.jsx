import React from 'react';
import InfoMessage from 'components/InfoMessage';

import './styles.scss';


export default class Login extends React.Component {

  render() {
    return (
      <div>
        <InfoMessage status='info' text='some text' />
      </div>
    );
  }
}
