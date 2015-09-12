import React from 'react'
import Index from 'components/index'

export default class Application extends React.Component {
	render() {
		return (
			<div>
				hello1
				<Index />
			</div>
		)
	}
}

React.render(<Application />, document.body);
