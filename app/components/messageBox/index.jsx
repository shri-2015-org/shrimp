import React from 'react';

// import './styles.scss';


export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			text: ""
		}
	}
	handleChange(event){
		this.setState({
			name: event.target.value.trim()
		})
	}
	handleTextareaChange(event){
		this.setState({
			text: event.target.value.trim()
		})
	}
	sendMessage(){
		//send to sever
		//this.props.actions.sendMessage(this.state.text, this.state.name);
		if (!this.state.text.trim() || !this.state.name.trim()) return;
		this.setState({
			name: "",
			text: ""
		})
	}
	handleKeyPress(e) {
		if (e.which === 13 && !e.shiftKey){
			this.sendMessage();
			e.preventDefault();
		}
	}
	render() {
		return (
			<div className="form-block">
				<div className="form-block__form-item">
					<div className="form-block__form-item__item-head">
						<label>Username:</label>
						<label>{this.state.name}</label>
					</div>
					<div className="form-block__form-item__item-body">
						<input type="text" value={this.state.name} onChange={this.handleChange.bind(this)}/>
					</div>
				</div>
				<div className="form-block__form-item">
					<div className="form-block__form-item__item-body">
						<textarea value={this.state.text} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleTextareaChange.bind(this)}></textarea>
					</div>
				</div>
				<div className="form-block__form-item">
					<div className="form-block__form-item__item-body">
						<button type="submit" onClick={this.sendMessage.bind(this)}>Send</button>
					</div>
				</div>
			</div>
		);
	}
}
