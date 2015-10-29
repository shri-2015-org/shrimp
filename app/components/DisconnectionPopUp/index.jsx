import React, {PropTypes} from 'react';
import PopUp from 'components/PopUp';
import Snail from 'components/Snail';
import './styles.scss';

export default class DisconnectionPopUp extends React.Component {

  static propTypes = {
    connected: PropTypes.bool,
  }

  render() {
    return (
      <div hidden={this.props.connected !== false}>
        <PopUp className='disconnect-window' wrapperClassName='disconnect-window-wrapper'>
          Disconnected =( <br/>
          Trying to reconnect ...
          <Snail/>
        </PopUp>
        <div className='disconnect-overlay'></div>
      </div>
    );
  }
}
