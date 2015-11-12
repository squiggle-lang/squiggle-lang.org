---
title: Using with Node.js
---

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
