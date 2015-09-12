import React from 'react';

// import './styles.scss';

const {title, text} = require('./data.json');


export default class Index extends React.Component {

	componentDidMount() {
		document.title = title;
	}


	render() {
		return (
			<div>{text}</div>
		);
	}
}
