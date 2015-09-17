import React, {PropTypes} from 'react';
import './styles.scss';


export default class MessageSection extends React.Component {
  static propTypes = {
    // TODO: add good validation
    messages: PropTypes.array,
  }

  render() {
    return (
      <div className='messages'>
        Messages
      </div>
    );
  }
}
