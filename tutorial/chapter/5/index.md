---
title: "Properties and function calls"
---

## Property access

Property access is written just like JavaScript. The difference is that Squiggle will throw an exception unless the Squiggle code `obj has key` is true.

```squiggle
let object = {property: "Foo"}

object.property
#=> "Foo"

object["property"]
#=> "Foo"

let name = "property"
object[name]
#=> "Foo"
```

If you want to safely access a key but fall back to some other behavior, use this snippet:

```squiggle
let user = getUser()
let name =
    if user has "name"
    then user.name
    else "(no name)"
    end
```

## Function and method calls

Function and method calls work pretty much exactly like in JavaScript:

```squiggle
foo(1, 2, 3)

bar()

console.log("Hello!", "world")

document.querySelector("body .myClass")
```

## Method binding

In JavaScript, the implicit parameter `this` to functions is easy to mess up. Take for example the following code which will throw an exception in most browsers:

```javascript
console.log("this works!");
var log = console.log;
log("this doesn't...");
```

The call to `log` fails because it *forgets* the function came from `console` --- that is, the `this` parameter is not set to `console`.

Two correct ways to solve this in JavaScript are as follows:

```javascript
var log1 = function() {
    return console.log.apply(console, arguments);
};
var log2 = console.log.bind(console);
```

These are both rather wordy, and in practice they're easy to forget or avoid due to their clunkinesss. Squiggle offers a simple operator to solve this: `::`.

```squiggle
let log = console::log
log("ok!")
```

Currently there is no support for computed names (like `console["log"]` vs `console.log`) with the `::` operator, but it is likely to be added eventually.
