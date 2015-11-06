---
title: "Let-expression"
---

The most basic let-expression looks like:

```squiggle
let x = 1 in x
```

This is essentially equivalent to:

```javascript
(function() {
    var x = 1;
    return x;
}())
```

You can add many `let` bindings together like so:

```squiggle
let x = 1
let y = 2
let z = 3
in x + y + z
```

This will evaluate to `6`.

## Functions

You can assign functions just like any other value:

```squiggle
let foo = fn foo(word) "foo" ++ word
in foo("bar")
#=> "foobar"
```

But this is tedious, so there's a shorthand:

```squiggle
def foo(word) =
    "foo" ++ word
in foo("bar")
#=> "foobar"
```

`def` is just sugar for making a binding to a function with the same name.

## Temporal dead zone

"Temporal dead zone" is a confusing phrase borrowed from ES2015 to describe an area of code where a variable cannot be used.

In JavaScript, the following code prints `undefined` three times.

```javascript
var x = y;
var y = x;
var z = z;
console.log(x, y, z);
```

This is because of JavaScript's `var` hoisting, which makes the following code
work more like this:

```javascript
var x = undefined;
var y = undefined;
var z = undefined;
x = y;
y = x;
z = z;
console.log(x, y, z);
```

That is nonsense. In Squiggle, `let` and `def` bindings are not hoisted, and it
is a runtime error to attempt to use their values before initialization.
