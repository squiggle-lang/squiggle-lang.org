---
title: "Mutability problems"
---

Sometimes you need mutable data. Fortunately, it's still possible to create it
in Squiggle. Squiggle does not expose a syntax like `x.y = z` to assign
properties, but it does have a `set` function.

    let a = global.Array()
    let o = global.Object()
    in do
        set(a, 0, "hi");
        set(o, "key", "value");
        console.log([a, o]);
        #=> [["hi"], {key: "value"}]
    end

These are the normal `Array` and `Object` functions from JavaScript, so they
return unfrozen values.
