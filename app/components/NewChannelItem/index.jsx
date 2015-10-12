import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import './styles.scss';

export default class ChannelItem extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    replaceDirtyChannel: PropTypes.func.isRequired,
    newChannel: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
    };
  }


  componentDidMount = () => {
    const newChannelInput = this.refs.newChannelInput.getDOMNode();
    newChannelInput.focus();
  }

  onKeyPress = (e) => {
    if (e.charCode !== 13) {
      return;
    }
    this.addChannel();
  }


  addChannel = () => {
    const channelName = this.state.channelName.trim();
    const sameChannel = this.props.channels.find(channel => channel.get('name') === channelName);
    if (channelName && !sameChannel) {
      this.props.replaceDirtyChannel(new Map({name: this.state.channelName, isDirty: true}));
      this.props.newChannel({name: channelName});
      const newChannelItem = this.refs.newChannel.getDOMNode();
      newChannelItem.className = newChannelItem.className + ' new-channel_disabled';
    }
  }

  handleChange = (e) => {
    this.setState({channelName: e.target.value});
  }

  render() {
    return (
      <div className='new-channel' ref='newChannel'>
        <p className='new-channel__title'>New channel name</p>
        <input type='text'
          className='new-channel__input'
          ref='newChannelInput'
          onKeyPress={this.onKeyPress}
          onBlur={this.onBlur}
          onChange={this.handleChange}
          value={this.state.channelName} />
      </div>
    );
  }
}
