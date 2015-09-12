import React, {Component} from 'react';
import MessageItem from 'components/message-item';

export default class MessageList extends Component {
	render() {
		const messages = this.props.messages.map((message, i) => (
			<MessageItem
				user={message.user}
				text={message.text}
			/>
		));

		return (
			<ul>
				{messages}
			</ul>
		)
	}
}
