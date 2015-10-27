#!/bin/bash

git pull
forever stop 0
npm install
npm run compile
npm start
