---
title: "Mutability problems"
layout: chapter
section: 4
subsection: 3
---

Sometimes you need mutable data. Fortunately, it's still possible to create it
in Squiggle. Squiggle does not expose a syntax like `x.y = z` to assign
properties, but it does have a `set` function.

    let (
        a = global.Array(),
        o = global.Object()
    ) do {
        set(0, "hi", a);
        set("key", "value", o);
        [a, o];
    }

    # => [["hi"], {"key": "value"}]

These are the normal `Array` and `Object` functions from JavaScript, so they
return unfrozen values.
