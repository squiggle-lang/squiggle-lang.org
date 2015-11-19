---
title: "Properties and function calls"
---

## Property access

Property access is written just like JavaScript. The only difference is that in
Squiggle these will throw exceptions if `object[property]` is `undefined`.

```squiggle
object.property

object["property"]

let name = "property" in object[name]
```

There will eventually be useful functions for dealing with optionally present
values.

## Function and method calls

Function and method calls work pretty much exactly like in JavaScript:

```squiggle
foo(1, 2, 3)

bar()

console.log("Hello!", "world")

document.querySelector("body .myClass")
```

## "Method binding"

In JavaScript, the implicit parameter `this` to functions is easy to mess up.
Take for example the following code which will throw an exception in most
browsers:

```javascript
console.log("this works!");
var log = console.log;
log("this doesn't...");
```

The call to `log` fails because it *forgets* the function came from `console`
--- that is, the `this` parameter is not set to `console`.

Two correct ways to solve this in JavaScript are as follows:

```javascript
var log1 = function() {
    return console.log.apply(console, arguments);
};
var log2 = console.log.bind(console);
```

These are both rather wordy, and in practice they're easy to forget or avoid due
to their clunkinesss. Squiggle offers a simple operator to solve this: `::`.

```squiggle
let log = console::log
in log("ok!")
```

Currently there is no support for computed names (like `console["log"]` vs
`console.log`) with the `::` operator, but it is likely to be added eventually.
