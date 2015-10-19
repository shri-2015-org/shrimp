import React, {PropTypes} from 'react';
import {List} from 'immutable';

export default class PinnedMessages extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
  }

  render() {
    return (<div>
      {this.props.messages.map((message, i) => (
        <div key={i}>
          <div>sender: {message.get('sender').get('name')}</div>
          <div>{message.get('text')}</div>
        </div>
      ))}
    </div>);
  }
}
