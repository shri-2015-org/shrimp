import React, {Component} from 'react';

export default class MessageItem extends Component {

    render() {
        const {message} = this.props;
        return (<li>{message.text}  {message.user}</li>)
    }
}