---
title: Using in the browser
---

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
