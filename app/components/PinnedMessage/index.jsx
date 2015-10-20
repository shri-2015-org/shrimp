import React, {PropTypes} from 'react';
import {Map} from 'immutable';

import './styles.scss';

export default class PinnedMessages extends React.Component {

  static propTypes = {
    message: PropTypes.instanceOf(Map).isRequired,
    unpinMessage: PropTypes.func.isRequired,
    key: PropTypes.number,
  }

  unpin = () => {
    this.props.unpinMessage(this.props.message.get('id'));
  }

  render() {
    return (
        <div key={this.props.key} className='pinned-message'>
          <div onClick={this.unpin}>отпинь мессагу без напряга!</div>
          <div className='pinned-message__sender'>{this.props.message.get('sender').get('name')}</div>
          <div className='pinned-message__text'>{this.props.message.get('text')}</div>
        </div>
      );
  }
}
