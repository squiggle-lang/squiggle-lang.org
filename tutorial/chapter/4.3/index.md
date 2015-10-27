---
title: "Mutability problems"
---

Sometimes you need mutable data. Fortunately, it's still possible to create it
in Squiggle. Squiggle does not expose a syntax like `x.y = z` to assign
properties, but it does have a `set` function.

    let Array = global.Array
    let Object = global.Object
    let assign = Object.assign
    let a = Array()
    let o = Object()
    let _ = assign(a, {0: "hi"})
    let _ = assign(o, {key: "value"})
    let _ = console.log([a, o]);
    #=> [["hi"], {key: "value"}]
    in undefined

These are the normal `Array` and `Object` functions from JavaScript, so they
return unfrozen values.
