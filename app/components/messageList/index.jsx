import React, {Component} from 'react';
import MessageItem from '../messageItem/index.jsx';

export default class MessageList extends Component {
    render() {
        const {messages} = this.props;
        
        return (
            <ul>
                {messages.map((message, i) => (<MessageItem message={message} />))}
            </ul>
        )
    }
}