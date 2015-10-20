import React, {PropTypes} from 'react';
import Immutable, {Map, List} from 'immutable';
import './styles.scss';
import InfoMessage from 'components/InfoMessage';

export default class ChannelItem extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    replaceDirtyChannel: PropTypes.func.isRequired,
    newChannel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    __: PropTypes.func.isRequired,
  };


  componentWillMount = () => {
    this.channelNameMaxLength = 25;
    this.state = {
      channelName: '',
      validationMessage: this.__('Add new channel'),
      infoType: 'info',
    };
  }


  componentDidMount = () => {
    const newChannelInput = this.refs.newChannelInput;
    newChannelInput.focus();
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.channels, this.props.channels) &&
      nextState.validationMessage === this.state.validationMessage &&
      nextState.infoType === this.state.infoType
    );
  }


  onKeyPress = (e) => {
    if (e.which === 13) {
      this.addChannel();
    }
  }

  __ = this.context.__;

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
        validationMessage: this.__('Name is very long'),
        infoType: 'error',
      });
      return true;
    }
    if (channelName.length === 0) {
      this.setState({
        validationMessage: this.__('Required channel name'),
        infoType: 'error',
      });
      return true;
    }
    if (sameChannel) {
      this.setState({
        validationMessage: this.__('Channel already exists'),
        infoType: 'error',
      });
      return true;
    }
    this.setState({
      validationMessage: this.__('Channel name correctly'),
      infoType: 'success',
    });
    return false;
  }

  render() {
    return (
      <div className='new-channel' ref='newChannel'>
        <InfoMessage
          className='new-channel__info_message'
          type={this.state.infoType}
          shake={false}
        >{this.state.validationMessage}</InfoMessage>
        <input type='text'
          className='new-channel__input'
          ref='newChannelInput'
          onKeyPress={this.onKeyPress}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
