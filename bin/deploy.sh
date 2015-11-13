#!/usr/bin/env bash
set -e

# host=s3://dev.mockbrian.com/squiggle
# host=s3://mockbrian.com/squiggle
host=s3://squiggle-lang.org
# host=s3://dev.squiggle-lang.org

./bin/build-js.sh

bundle exec jekyll build

# Shouldn't need to sleep here, but if jekyll watch/serve is running, there's a
# timing issue here where jekyll will delete the _site directory after the file
# is gzipped but before it's uploaded.
sleep 3

gzip <_site/try/bundle.js >_site/try/bundle.js.gz
ls -lh _site/try/bundle.js.gz

s3cmd put \
    --mime-type="application/javascript" \
    --add-header="Content-Encoding: gzip" \
    --acl-public \
    --no-progress \
    "_site/try/bundle.js.gz" \
    "$host/try/bundle.js"

s3cmd sync \
    --no-mime-magic \
    --acl-public \
    --no-progress \
    --exclude="try/bundle.js*" \
    "_site/" \
    "$host/"

