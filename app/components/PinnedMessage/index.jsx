import React, {PropTypes} from 'react';
import {List} from 'immutable';

import './styles.scss';

export default class PinnedMessages extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
  }

  render() {
    return (<div>
      {this.props.messages.map((message, i) => (
        <div key={i} className='pinned-message'>
          <div className='pinned-message__sender'>{message.get('sender').get('name')}</div>
          <div className='pinned-message__text'>{message.get('text')}</div>
        </div>
      ))}
    </div>);
  }
}
