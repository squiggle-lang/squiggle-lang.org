---
title: "Getting started"
---

Howdy! If you're reading this, hopefully it's because you're interested in learning the Squiggle programming language. If so, read on!

If you have never used [Node.js][] or [npm][], you should learn about those first. This tutorial assumes you have both tools installed and are familiar with the process of installing and using npm modules.

## Installation

Squiggle can be installed via npm:

```bash
npm install -g squiggle-lang
```

Please be aware that Squiggle fully intends to follow [Semantic Versioning][semver], but is currently version zero, so things may change at any point.

If you use [Sublime Text][sublime], there's a syntax highlighter plugin. You can install it via [Package Control][pkgctrl]. Simply open the command palette and use `Package Control: Install Package`, then type in **Squiggle**.

If you use [Vim][vim], there's also a [Vim syntax highlighter plugin on GitHub][vimplug].

Now any files ending in `.sqg` will be highlighted automatically as Squiggle code.

## Built-in linter

Many programming languages have tools built around them called linters. Usually these tools advise you of potential mistakes, or othwerwise ill-advised techniques. Frequently these tools require configuration before use, and are completely separate from the normal process of using the language.

Squiggle is designed to be easy, so linting happens automatically during the compilation process, no extra steps required. This ensures all projects using Squiggle will adhere to common guidelines.

In addition, Squiggle is designed so that at the language level there are as few "gotchas" as possible, reducing the amount of linting necessary.

## Using with Node.js

You may be familiar with CoffeeScript or JSX hooks into Node.js's `require` function. This behavior is deprecated in Node.js and will not be included in Squiggle. The correct way to use Squiggle code with Node.js is to compile it ahead of time and put the resulting JavaScript code in another directory.

Squiggle has a keyword for creating Node.js modules: `export`

```squiggle
let x = 1
export x
```

This is like the following JavaScript:

```javascript
var x = 1;
exports.x = x;
```

So a common pattern for creating modules is:

```squiggle
let a = 1
let b = 2
let cSecret = 3
let dSecret = 4
let e = 5

export a
export b
export e
```

This is like the following JavaScript:

```javascript
var a = 1;
var b = 2;
var cSecret = 3;
var dSecret = 4;
var e = 5;

exports.a = a;
exports.b = b;
exports.e = e;
```

Squiggle also adds `require` as a keyword, rather than regular function, so you write CommonJS imports as follows:

```squiggle
let fs = require "fs"
let L = require "lodash"
let other = require "./foo/other"

...
```

Note that the parentheses are omitted after `require` because it is a keyword. Parentheses cannot be omitted on normal function calls.

Or you could use `export` and `require` together for a module that just collects other modules, like:

```squiggle
let module1 = require "./module1"
let module2 = require "./module2"
let module3 = require "./module3"
export module1
export module2
export module3
```

Where in JavaScript you might write:

```javascript
var module1 = require("./module1");
var module2 = require("./module2");
var module3 = require("./module3");
exports.module1 = module1;
exports.module2 = module2;
exports.module3 = module3;
```

## Using in the browser

The easiest way to use Squiggle code in the browser is to use the Browserify plugin.

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

Additionally, if you really don't want to use Browserify to bundle, you can avoid the need for Browserify by never using `require` or `export` in your code. In this case, you'll need to pull in globals manually (or the Squiggle linter will complain), and manually export globals. See example:

```squiggle
# file bar.js

# Import foo library from global scope.
# Simply using `foo` won't work because the Squiggle
# linter will complain about using an
# undeclared binding.

let {Object, foo} = global

def bar1() do
    foo(1)
end

def bar2() do
    foo(2)
end

def bar3() do
    foo(3)
end

let api = {bar1, bar2, bar3}

Object.assign(global, {bar: api})
```

[vim]: http://www.vim.org/
[npm]: https://www.npmjs.com/
[semver]: http://semver.org/
[lodash]: https://lodash.com/
[node.js]: https://nodejs.org/
[sublime]: http://www.sublimetext.com/
[pkgctrl]: https://packagecontrol.io/
[vimplug]: https://github.com/squiggle-lang/vim-squiggle
