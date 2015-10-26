import React, {PropTypes} from 'react';
import PopUp from 'components/PopUp';
import './styles.scss';

export default class DisconnectionPopUp extends React.Component {

  static propTypes = {
    connected: PropTypes.bool,
  }

  render() {
    return (
      <div hidden={this.props.connected !== false}>
        <PopUp className='settings__window'>
          Disconnected! Disaster! Всё пропало, шеф!
        </PopUp>
        <div className='settings__overlay'></div>
      </div>
    );
  }
}
