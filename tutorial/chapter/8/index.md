---
title: "JavaScript interoperability"
---

JavaScript and Squiggle are friends. Because Squiggle just compiles down to JavaScript files, it's trivial to call Squiggle code from JavaScript, or vice- versa. Squiggle uses all the same data as JavaScript, so you don't even have to convert anything

## Arity problems

Squiggle functions check their arity, but many JavaScript functions are built assuming variadic functions. For example:

```squiggle
# File: helpers.sqg

def add(x)
    x + 1
end

export add
```

```javascript
// File: main.js

var helpers = require("./helpers");
var xs = [1, 2, 3].map(helpers.add)
console.log(xs);
```

This will fail because `Array.prototype.map` actually passes *three* parameters to its callback function: *data*, *index*, and *array*. In scenarios like this, you can wrap the Squiggle function like so:

```javascript
var xs = [1, 2, 3].map(function(data) {
    return helpers.add(data);
});
console.log(xs);
```

## Mutability problems

Sometimes you need mutable data. Fortunately, it's still possible to create it in Squiggle. Squiggle does not expose a syntax like `x.y = z` to assign properties.

```squiggle
let {Array, Object} = global
let {assign} = Object
let a = Array()
let o = Object()
assign(a, {0: "hi"})
assign(o, {key: "value"})
console.log([a, o])
#=> [["hi"], {key: "value"}]
```

These are the normal `Array` and `Object` functions from JavaScript, so they return unfrozen values. There are plans to add mutable object literals and property assignment to Squiggle eventually.

## Problems with this or new

Squiggle does not feature the keywords `this` or `new` from JavaScript because [they cause more harm than good][1], and are not necessary. Some libraries require their use, however, so Squiggle has functions for dealing with this.

Remember that any Squiggle function can still use JavaScript's `this` value if it's explicitly declared as a named parameter with and `@` prefix:

```squiggle
jQuery("something").on("click", fn(@this) do
    jQuery(this).somethingElse()
end)
```

If you need to supply the value of `this` to a function, you can simply use the
standard JavaScript function methods `.apply` or `.call`:

```squiggle
someFn.call(myThisValue, param1, param2)

someFn.apply(myThisValue, [param1, param2])
```

`new` is harder to do away with since many APIs (e.g. `Date` and `Promise`)
require its use to create an instance. Some way to invoke `new` on a function will be provided

[1]: https://medium.com/@wavebeem/javascript-gotchas-with-this-and-new-dfb65e387ef#.a3hi57kxr
