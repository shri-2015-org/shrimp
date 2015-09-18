import React from 'react';
import {newMessage} from '../../core/core';
import Textarea from 'react-textarea-autosize';
import './styles.scss';

export default class MessageComposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: '',
    };
  }


  nameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }


  textChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }


  sendMessage = () => {
    if (!this.state.text.trim() || !this.state.name.trim()) return;
    newMessage({text: this.state.text});
    this.setState({
      text: '',
    });
  }


  textKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  }


  render() {
    return (

      <div>
        <div>
          <div>
            <label>Username:</label>
            <label>{this.state.name}</label>
          </div>
          <div>
            <input
              type='text'
              value={this.state.name}
              onChange={this.nameChange}
            />
          </div>
        </div>

        <div className='composer'>
            <Textarea
              value={this.state.text}
              onKeyPress={this.textKeyPress}
              onChange={this.textChange}
              minRows={1}
              maxRows={5}
              className='composer__textarea'
            />
            <button
              type='submit'
              onClick={this.sendMessage}
              className='composer__send-button'
            >Send</button>

        </div>
      </div>

    );
  }
}
