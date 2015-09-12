import React, {PropTypes} from 'react';

export default class MessageItem extends React.Component {

	static PropTypes = {
		user: React.PropTypes.string,
		text: React.PropTypes.string
	}


	render() {
		const {user, text} = this.props;
		return (
			<li>{text} {user}</li>
		)
	}
}
