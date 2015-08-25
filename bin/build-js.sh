#!/usr/bin/env bash
PATH="$(npm bin):$PATH"

echo "Building Browserify bundle"
browserify try/main.js -o try/bundle.js
