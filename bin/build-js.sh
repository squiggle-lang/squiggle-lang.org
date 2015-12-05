#!/usr/bin/env bash
PATH="$(npm bin):$PATH"

echo "Building Browserify bundle"
browserify try/main.js -t brfs -o try/bundle.js
echo "DONE"
