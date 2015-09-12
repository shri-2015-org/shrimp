'use strict'
import React from 'react';
import express from 'express';
import path from 'path';
// import App from '../app/app.jsx';


let app = express();
const port = 3000;

// const renderApplication = require('../build/bundle.js');
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
	res.send(
		'<!doctype html>\
		<html>\
		<body>\
			<script src="bundle.js"></script>\
		</body>\
		</html>'
	)
});


app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
