#!/usr/bin/env bash
PATH="$(npm bin):$PATH"

browserify try/main.js -o try/bundle.js
