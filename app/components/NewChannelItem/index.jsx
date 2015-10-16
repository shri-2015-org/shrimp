import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import './styles.scss';
import InfoMessage from 'components/InfoMessage';

export default class ChannelItem extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    replaceDirtyChannel: PropTypes.func.isRequired,
    newChannel: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.channelNameMaxLength = 15;
    this.state = {
      channelName: '',
      validationError: 'Add new channel',
      infoType: null,
    };
  }


  componentDidMount = () => {
    const newChannelInput = this.refs.newChannelInput;
    newChannelInput.focus();
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.addChannel();
    }
  }


  addChannel = () => {
    const channelName = this.state.channelName.trim();
    const hasError = this.validateChannelName(channelName);
    if (!hasError) {
      this.props.replaceDirtyChannel(new Map({name: channelName, isDirty: true}));
      this.props.newChannel({name: channelName});
      const newChannelItem = this.refs.newChannel;
      newChannelItem.className = newChannelItem.className + ' new-channel_disabled';
    }
  }

  handleChange = (e) => {
    this.validateChannelName(e.target.value);
    this.setState({channelName: e.target.value});
  }

  validateChannelName = (name) => {
    const channelName = name.trim();
    const sameChannel = this.props.channels.find(channel => channel.get('name') === channelName);
    if (channelName.length > this.channelNameMaxLength) {
      this.setState({
        validationError: 'Name is very long',
        infoType: 'error',
      });
      return true;
    }
    if (channelName.length === 0) {
      this.setState({
        validationError: 'Require channel name',
        infoType: 'error',
      });
      return true;
    }
    if (sameChannel) {
      this.setState({
        validationError: 'Channel already exist',
        infoType: 'error',
      });
      return true;
    }
    this.setState({
      validationError: 'Add new channel',
      infoType: null,
    });
    return false;
  }

  render() {
    return (
      <div className='new-channel' ref='newChannel'>
        <InfoMessage
          className='new-channel__info_message'
          type={this.state.infoType}
        ><span>{this.state.validationError}</span></InfoMessage>
        <input type='text'
          className='new-channel__input'
          ref='newChannelInput'
          onKeyPress={this.onKeyPress}
          onChange={this.handleChange}
          value={this.state.channelName} />
      </div>
    );
  }
}
