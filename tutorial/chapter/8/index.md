---
title: "JavaScript interoperability"
---

JavaScript and Squiggle are friends. Because Squiggle just compiles down to
JavaScript files, it's trivial to call Squiggle code from JavaScript, or vice-
versa. Squiggle uses all the same data as JavaScript, so you don't even have to
convert anything

## Arity problems

Squiggle functions check their arity, but many
JavaScript functions are built assuming variadic functions. For example:

```squiggle
# file increment.squiggle
export fn(x) x + 1
```

```javascript
// file main.js
var increment = require("./increment");
var xs = [1, 2, 3].map(increment)
console.log(xs);
```

This will fail because `Array.prototype.map` actually passes *three* parameters to its callback function: *data*, *index*, and *array*. In scenarios like this, you can wrap the Squiggle function like so:

```javascript
var xs = [1, 2, 3].map(function(data) {
    return increment(data);
});
console.log(xs);
```

## Mutability problems

Sometimes you need mutable data. Fortunately, it's still possible to create it
in Squiggle. Squiggle does not expose a syntax like `x.y = z` to assign
properties.

```squiggle
let {Array, Object} = global
let {assign} = Object
let a = Array()
let o = Object()
let _ = assign(a, {0: "hi"})
let _ = assign(o, {key: "value"})
let _ = console.log([a, o]);
#=> [["hi"], {key: "value"}]
in undefined
```

These are the normal `Array` and `Object` functions from JavaScript, so they
return unfrozen values.

## Problems with this or new

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
