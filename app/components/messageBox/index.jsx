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
			name: event.target.value
		})
	}
	handleTextareaChange(event){
		this.setState({
			text: event.target.value
		})
	}
	sendMessage(event){
		//send to sever
		//this.props.actions.sendMessage(this.state.text, this.state.name);
		this.setState({
			name: "",
			text: ""
		})
	}
	render() {
		return (
			<form>
				<div className="form-block">
					<div className="form-block__form-item">
						<div className="form-block__form-item__item-head">
							<label>Username:</label>
							<label>{this.state.name}</label>
						</div>
						<div className="form-block__form-item__item-body">
							<input type="text" onChange={this.handleChange.bind(this)}/>
						</div>
					</div>
					<div className="form-block__form-item">
						<div className="form-block__form-item__item-body">
							<textarea onChange={this.handleTextareaChange.bind(this)}></textarea>
						</div>
					</div>
					<div className="form-block__form-item">
						<div className="form-block__form-item__item-body">
							<button type="submit" onClick={this.sendMessage.bind(this)}>Send</button>
						</div>
					</div>
				</div>
			</form>
		);
	}
}
