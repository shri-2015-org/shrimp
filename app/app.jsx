import React from 'react'
import Index from 'components/index'
import MessageBox from 'components/messageBox'

export default class Application extends React.Component {
	render() {
		return (
			<div>
				hello8
				<Index />
				<MessageBox />
			</div>
		)
	}
}

React.render(<Application />, document.body);
