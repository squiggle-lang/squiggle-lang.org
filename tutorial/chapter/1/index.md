---
title: "Getting started"
---

Howdy! If you're reading this, hopefully it's because you're interested in
learning the Squiggle programming language. If so, read on!

If you have never used [Node.js][] or [npm][], you should learn those first.
This tutorial assumes you have both tools installed and are familiar with the
process of installing and using npm modules.

## Installation

Squiggle can be installed via npm:

```bash
npm install -g squiggle-lang
```

Please be aware that Squiggle
fully intends to follow [Semantic Versioning][semver], but is currently version
zero, so things may change at any point.

If you use [Sublime Text][sublime], there's a syntax highlighter plugin. You can install it via [Package Control][pkgctrl]. Simply open the command palette and use `Package Control: Install Package`, then type in **Squiggle**.

Now any files ending in *.sqg* will be highlighted automatically as Squiggle
code.

## Built-in linter

Many programming languages have tools built around them called linters. Usually
these tools advise you of potential mistakes, or othwerwise ill-advised
techniques. Frequently these tools require configuration before use, and are
completely separate from the normal process of using the language.

In Squiggle, good code is paramount, so linting is built-in to the compiler, and
non-configurable. This ensures all projects using Squiggle will adhere to common
guidelines.

In addition, Squiggle is designed so that at the language level there are as few
"gotchas" as possible, reducing the amount of linting necessary.

## Utility functions

There are plans to eventually include a library of utility functions to use with
Squiggle, in the spirit of [lodash][], but better suited for Squiggle.

The current idea is a few simple functions that don't pass extra parameters that
are usually ignored, that never mutate data, and always return frozen data.

## Using with Node.js

Currently the best way to use Squiggle with Node.js is to (unfortunately)
compile the Squiggle in advance and store it in a folder and keep it in your Git
project.

I'm not generally a fan of committing generated files, but I don't think it's
possible to generate them at installation time for your package.

Here is an example compilation script in Bash:

```bash
#!/usr/bin/env bash
set -e
cd src
for f in *.squiggle; do
    name=$(basename "$f" .squiggle)
    squiggle "$f" -o "../out/$name.js"
done
```

Squiggle has a keyword for creating Node.js modules: `export`

```squiggle
export 1
```

This is equivalent to the following JavaScript:

```javascript
module.exports = 1;
```

So a common pattern for creating modules is:

```squiggle
export
let a = 1
let b = 2
let cSecret = 3
let dSecret = 4
let e = 5
in {a, b, e}
```

This is like the following JavaScript:

```javascript
var a = 1;
var b = 2;
var cSecret = 3;
var dSecret = 4;
var e = 5;
module.exports = {
    a: a,
    b: b,
    e: e
};
```

Squiggle also adds `require` as a keyword, rather than regular function, so you
write CommonJS imports as follows:

```squiggle
let fs = require "fs"
let L = require "lodash"
let other = require "./foo/other"
in ...
```

Note that the parentheses are omitted after `require` because it is a keyword.
Parentheses cannot be omitted on normal function calls.

Or you could use `export` and `require` together for a module that just collects
other modules, like:

```squiggle
export {
    module1: require "./module1",
    module2: require "./module2",
    module3: require "./module3"
}
```

Where in JavaScript you would write:

```javascript
module.export = {
    module1: require("./module1"),
    module2: require("./module2"),
    module3: require("./module3")
};
```

## Using in the browser

The easiest way to use Squiggle code in the browser is to use the Browserify
plugin.

```bash
npm install --save-dev browserify squiggle-browserify
```

After installation, use a script like this to build your code:

```bash
#!/usr/bin/env bash
PATH="$(npm bin):$PATH"

browserify \
    -t squiggle-browserify \
    --extension=".sqg" \
    src/main.sqg \
    -o out/bundle.js
```

Additionally, if you really don't want to use Browserify to bundle, you can
avoid the need for Browserify by never using `require()` or `export` in your
code. In this case, you'll need to pull in globals manually (or the Squiggle
linter will complain), and manually export globals. See example:

```squiggle
# file bar.js

# Import foo library from global scope.
# Simply using `foo` won't work because the Squiggle
# linter will complain about using an
# undeclared binding.

let {Object, foo} = global

def bar1() = foo(1)
def bar2() = foo(2)
def bar3() = foo(3)

let api = {bar1, bar2, bar3}

in Object.assign(global, {bar: api})
```

[npm]: https://www.npmjs.com/
[semver]: http://semver.org/
[lodash]: https://lodash.com/
[node.js]: https://nodejs.org/
[sublime]: http://www.sublimetext.com/
[pkgctrl]: https://packagecontrol.io/
