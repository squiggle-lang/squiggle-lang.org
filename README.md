[![Netlify Status](https://api.netlify.com/api/v1/badges/743c903a-c773-4904-93bf-d0aad1e4e11b/deploy-status)](https://app.netlify.com/sites/squiggle-lang-org/deploys)

# NO LONGER IN DEVELOPMENT

Website for Squiggle.

## Code of conduct

This project uses the [Contributor Covenant][cove] as its code of conduct.

## Contributing

The following directions are for OS X. The project should work in Linux and Windows, but has not been tested.

- Click the "Fork" button on this page
- Clone your forked repository locally and use a terminal to `cd` into its directory
- Install [Homebrew](http://brew.sh/)
- `brew install ruby`
- `gem install bundler`
- `cd website-squiggle`
- `bundle exec jekyll serve --trace`
- If you modify the JS, run `./bin/build-js.sh`
- Open <http://0.0.0.0:4000/squiggle/> in your browser

## Deployment

This website lives at [squiggle.wavebeem.com][sqgl], so [@wavebeem][wave]
performs deployments using `./bin/deploy.sh`.

[sqgl]: http://squiggle.wavebeem.com/
[site]: http://0.0.0.0:4000/squiggle/
[wave]: https://github.com/wavebeem
[cove]: https://github.com/wavebeem/website-squiggle/blob/master/CODE_OF_CONDUCT.md
