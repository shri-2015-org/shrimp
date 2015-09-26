import React, {PropTypes} from 'react';
import Textarea from 'react-textarea-autosize';
import './styles.scss';

export default class MessageComposer extends React.Component {

  static propTypes = {
    local: PropTypes.object.isRequired,
    newMessage: PropTypes.func.isRequired,
    changePaddingBottom: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  nextProps.local !== this.props.local ||
            nextState.text !== this.state.text;
  }

  textChange = (e) => {
    this.setState({
      text: e.target.value,
    });
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
    const {changePaddingBottom} = this.props;
    return (
      <div className='composer'>
        <div className='composer__sender'>
          <Textarea
            value={this.state.text}
            onKeyPress={this.textKeyPress}
            onChange={this.textChange}
            onHeightChange={changePaddingBottom}
            minRows={1}
            maxRows={5}
            className='composer__textarea'
          />
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
