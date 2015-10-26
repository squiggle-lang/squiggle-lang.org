---
title: "Method binding"
---

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

    let log = console::log
    in log("ok!")

Currently there is no support for computed names (like `console["log"]` vs
`console.log`) with the `::` operator, but it is likely to be added eventually.
