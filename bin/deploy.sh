#!/usr/bin/env bash
set -e

# host=s3://dev.mockbrian.com/squiggle/
# host=s3://mockbrian.com/squiggle/
host=s3://squiggle-lang.org/

./bin/build-js.sh

bundle exec jekyll build

s3cmd sync \
    --no-mime-magic \
    --acl-public \
    --no-progress \
    "_site/" \
    "$host"
