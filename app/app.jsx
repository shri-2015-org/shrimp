import React from 'react'
import Index from 'components/index'
import MessageList from './components/messageList/index.jsx';

export default class Application extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: ""
		}
	}
	render() {
		const msgs = [
			{user: 'dfdf', text: 'HELLO GUYS'},
			{user: 'dfsfdfer', text: 'HELLO GIRLS'}
		];
		return (
			<div>
				hello8
				<Index />
				<MessageList messages={msgs}/>
			</div>
		)
	}
}

React.render(<Application />, document.body);
