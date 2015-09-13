import React from 'react';


export default class MessageBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: '',
    };
  }


  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }


  handleTextareaChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }


  sendMessage = () => {
    // send to server
    // this.props.actions.sendMessage(this.state.text, this.state.name);
    if (!this.state.text.trim() || !this.state.name.trim()) return;
    this.setState({
      name: '',
      text: '',
    });
  }


  handleKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  }


  render() {
    return (

      <div className='form-block'>
        <div className='form-block__form-item'>
          <div className='form-block__form-item__item-head'>
            <label>Username:</label>
            <label>{this.state.name}</label>
          </div>
          <div className='form-block__form-item__item-body'>
            <input
              type='text'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className='form-block__form-item'>
          <div className='form-block__form-item__item-body'>
            <textarea
              value={this.state.text}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleTextareaChange}
            ></textarea>
          </div>
        </div>
        <div className='form-block__form-item'>
          <div className='form-block__form-item__item-body'>
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
