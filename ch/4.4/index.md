---
title: "This New Problem"
layout: chapter
section: 4
subsection: 4
---

## `this` `new` problem

Squiggle does not feature the keywords `this` or `new` from JavaScript because
they cause more harm than good, and are not necessary (in general). Some
libraries require their use, however, so Squiggle has functions for dealing with
this.

If you need to supply the value of `this` to a function, you can simply use the
standard JavaScript function methods `.apply` or `.call`:

    someFn.call(myThisValue, param1, param2)
    someFn.apply(myThisValue, [param1, param2])

There is currently no way to use `this` within Squiggle, because I believe it
causes more harm than good, and is not necessary for making objects.

`new` is harder to do away with since many APIs require its use to create an
instance. I'm still working on how I want to support that feature.
