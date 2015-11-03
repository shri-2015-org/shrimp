import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import IconSVG from 'svg-inline-loader/lib/component';
import Linkify from 'react-linkify';

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
    const {message, key} = this.props;
    return (
        <div key={key} className='pinned-message'>
          <div className='pinned-message__pin' onClick={this.unpin}>
            <IconSVG className='pinned-message__pin__icon' src={require(`./pinned.inline.svg`)}/>
          </div>
          <div className='pinned-message__sender'>{message.get('sender').get('name')}</div>
          <div className='pinned-message__text'>
            <Linkify properties={{className: 'message__url', target: '_blank'}}>{message.get('text')}</Linkify>
          </div>
        </div>
      );
  }
}
