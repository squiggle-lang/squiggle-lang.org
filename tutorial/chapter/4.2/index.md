---
title: "Arity problems"
---

Squiggle functions check their arity, but many
JavaScript functions are built assuming variadic functions. For example:

    # file increment.squiggle
    export fn(x) x + 1

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
