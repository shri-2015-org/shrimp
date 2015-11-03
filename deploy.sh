#!/bin/bash

git pull
forever stop 0
npm install
BABEL_ENV=production npm run compile
rm /root/.forever/*.log
npm start
