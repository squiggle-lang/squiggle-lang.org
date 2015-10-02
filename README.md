Website for <http://mockbrian.com/squiggle/>

## Code of conduct

This project uses the [Contributor Covenant][cove] as its code of conduct.


## Contributing

- Install [Homebrew](http://brew.sh/)
- `brew install ruby`
- `gem install bundler`
- `git clone https://github.com/wavebeem/website-squiggle.git`
- `cd website-squiggle`
- `bundle exec jekyll serve --trace`
- If you modify the JS, run `./bin/build-js.sh`
- Open [http://0.0.0.0:4000/squiggle/][site] in your browser

## Deployment

This website lives at [mockbrian.com/squiggle][mbsq], so [@wavebeem][wave]
performs deployments using `./bin/deploy.sh`.

[mbsq]: http://mockbrian.com/squiggle/
[site]: http://0.0.0.0:4000/squiggle/
[wave]: https://github.com/wavebeem
[cove]: https://github.com/wavebeem/website-squiggle.git
