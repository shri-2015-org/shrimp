import React from 'react'
import MessageList from 'components/message-list';
import MessageBox from 'components/message-box'


export default class Application extends React.Component {

	render() {
		const msgs = [
			{user: 'dfdf', text: 'HELLO GUYS'},
			{user: 'dfsfdfer', text: 'HELLO GIRLS'},
			{user: 'dfsfdfer', text: 'HEL343LO GIRLS'},
			{user: 'dfsfdfer', text: 'HELL34O GIRLS'}
		];

		return (
			<div>
				<MessageList messages={msgs}/>
				<MessageBox />
			</div>
		)
	}
}

React.render(<Application />, document.body);
