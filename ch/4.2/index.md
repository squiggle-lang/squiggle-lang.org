---
title: "Arity problems"
layout: chapter
section: 4
subsection: 1
---

Squiggle functions check their arity, but many
JavaScript functions are built assuming variadic functions. For example:

    # file increment.squiggle
    export fn(x) x + 1

    // file main.js
    var increment = require("./increment");
    console.log([1, 2, 3].map(increment));

This will fail because `Array.prototype.map` actually passes *three* parameters to its callback function: *data*, *index*, and *array*. In scenarios like this, you can wrap the Squiggle function like so:

    console.log([1, 2, 3].map(function(data, _index, _array) {
        return increment(data);
    }));
