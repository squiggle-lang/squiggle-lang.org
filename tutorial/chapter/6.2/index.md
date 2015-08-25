---
title: Using in the browser
---

The current way is to follow the Node.js steps and then use Browserify. There
are plans to add a Browserify transform in order to simplify this process.

Additionally, if you really don't want to use Browserify to bundle, you can
avoid the need for Browserify by never using `require()` or `export` in your
code. In this case, you'll need to pull in globals manually (or the Squiggle
linter will complain), and manually export globals. See example:

    # file bar.js
    let (
        # Import foo library from global scope.
        # Simply using `foo` won't work because the Squiggle
        # linter will complain about using an
        # undeclared binding.
        foo = global.foo

        bar1 = fn() 1,
        bar2 = fn() 2,
        bar3 = fn() 3,

        api = {
            "bar1": bar1,
            "bar2": bar2,
            "bar3": bar3
        }
    ) set("bar", api, global)

