import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import Textarea from 'react-textarea-autosize';
import './styles.scss';

export default class MessageComposer extends React.Component {

  static propTypes = {
    local: PropTypes.instanceOf(Map).isRequired,
    newMessage: PropTypes.func.isRequired,
    changeBottom: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.messageMaxLength = 220;
    this.state = {
      text: '',
      showMessageError: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextState.text, this.state.text) &&
      nextState.showMessageError === this.state.showMessageError
    );
  }

  textChange = (e) => {
    if (e.target.value.length === this.messageMaxLength) {
      this.setState({
        text: e.target.value,
        showMessageError: true,
      });
    } else {
      this.setState({
        text: e.target.value,
        showMessageError: false,
      });
    }
  }


  sendMessage = () => {
    const text = this.state.text.trim();
    if (text) {
      this.props.newMessage({
        channelId: this.props.local.get('currentChannelId'),
        senderId: this.props.local.get('userId'),
        text: this.state.text,
      });
      this.setState({
        text: '',
        showMessageError: false,
      });
    }
  }


  textKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  }


  render() {
    const {changeBottom} = this.props;
    return (
      <div className='composer'>
        <div className='composer__sender'>
          <Textarea
            value={this.state.text}
            onKeyPress={this.textKeyPress}
            onChange={this.textChange}
            onHeightChange={changeBottom}
            minRows={1}
            maxRows={5}
            maxLength={this.messageMaxLength}
            className='composer__textarea'
          />
          <div
            className={cx('composer__info', {
              'composer__info_error': this.showMessageError,
            })}
          >
          {this.messageMaxLength - this.state.text.length}
          </div>
          <button
            type='button'
            onClick={this.sendMessage}
            className='composer__send-button'
          >Send
          </button>
        </div>
      </div>

    );
  }
}
