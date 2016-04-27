# NO LONGER IN DEVELOPMENT

Website for <http://mockbrian.com/squiggle/>

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
- Open [http://0.0.0.0:4000/squiggle/][site] in your browser

## Deployment

This website lives at [squiggle-lang.org][sqgl], so [@wavebeem][wave]
performs deployments using `./bin/deploy.sh`.

[sqgl]: http://squiggle-lang.org/
[site]: http://0.0.0.0:4000/squiggle/
[wave]: https://github.com/wavebeem
[cove]: https://github.com/wavebeem/website-squiggle/blob/master/CODE_OF_CONDUCT.md
