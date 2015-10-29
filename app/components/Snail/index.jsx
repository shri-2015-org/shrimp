import React from 'react';

import './styles.scss';

export default class Snail extends React.Component {
  render() {
    return (
    <div className='snail'>
      <div className='snail__inner' style={{backgroundImage: require('./snail.png')}}></div>
    </div>
    );
  }
}
