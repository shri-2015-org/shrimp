import React from 'react';
import {newMessage} from '../../core/core';


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
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
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
      e.target.style.height = 'auto';
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

        <div>
          <div>
            <textarea
              value={this.state.text}
              onKeyPress={this.textKeyPress}
              onChange={this.textChange}
            ></textarea>
          </div>
        </div>
        <div>
          <div>
            <button
              type='submit'
              onClick={this.sendMessage}
            >Send</button>
          </div>
        </div>
      </div>

    );
  }
}
