import React, {PropTypes} from 'react';
import Textarea from 'react-textarea-autosize';
import './styles.scss';

export default class MessageComposer extends React.Component {

  static propTypes = {
    newMessage: PropTypes.func.isRequired,
    changePaddingBottom: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    setUser: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }


  nameChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const name = this.props.users.find(user => user.id === id).name;
    if (name) {
      this.props.setUser(name, id);
    }
  }


  textChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }


  sendMessage = () => {
    const text = this.state.text.trim();
    if (text && this.props.userName) {
      this.props.newMessage({
        id: 1,
        channelId: 0,
        senderId: this.props.userId,
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
    const {changePaddingBottom, userName, users} = this.props;
    return (

      <div className='composer'>
        <div>
          <div>
            <label>Username:</label>
            <label>{userName}</label>
          </div>
          <div>
            <select onChange={this.nameChange}>
              <option value=''></option>
              {users.map((user, i) => (
                <option value={user.id} key={i}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='composer__sender'>
            <Textarea
              value={this.state.text}
              onKeyPress={this.textKeyPress}
              onChange={this.textChange}
              onHeightChange={changePaddingBottom}
              minRows={1}
              maxRows={5}
              className='composer__textarea'
              ref='sender'
            />
          <button
            type='submit'
            onClick={this.sendMessage}
            className='composer__send-button'
          >Send
          </button>
        </div>
      </div>

    );
  }
}
