---
title: "This New Problem"
---

Squiggle does not feature the keywords `this` or `new` from JavaScript because
they cause more harm than good, and are not necessary (in general). Some
libraries require their use, however, so Squiggle has functions for dealing with
this.

If you need to supply the value of `this` to a function, you can simply use the
standard JavaScript function methods `.apply` or `.call`:

```squiggle
someFn.call(myThisValue, param1, param2)

someFn.apply(myThisValue, [param1, param2])
```

`new` is harder to do away with since many APIs (e.g. `Date` and `Promise`)
require its use to create an instance. I'm still deciding how to incorporate
this into Squiggle.
