#!/usr/bin/env bash

node ./node_modules/webpack/bin/webpack.js --profile --json > stats.json
