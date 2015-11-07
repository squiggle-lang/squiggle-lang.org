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

## Destructuring

The basic form of let is `let name = value`, but the `name` part can actually be
shaped like an array or object, in order to pluck values from the right hand
side.

### Ignore

The special identifier `_` can be used to ignore values. This is useful for
evaluating an expression for its side effects, or ignoring values in arrays or
objects.

```squiggle
let _ = console.log("hi")
in undefined
```

### Arrays

Basically just write an array on the left, including a "..." before the last item to gobble up all remaining items. Number of items must match.

```squiggle
let [x, y] = [1, 2]
#=> x == 1
#=> y == 2
```

```squiggle
let [x, y] = [1]
#=> error, too few items to unpack
```

```squiggle
let [x, y] = [1, 2, 3, 4]
#=> error, too many items to unpack
```

```squiggle
let [x, ...xs] = [1, 2, 3, 4]
#=> x == 1
#=> xs == [2, 3, 4]
```

```squiggle
let [x, ...xs] = [1]
#=> x == 1
#=> x == []
```

```squiggle
let [x, ...xs] = []
#=> error, too few items to unpack
```

### Objects

Just match the shape on the left hand side.

```squiggle
let {foo: foo} = {foo: 1}
#=> foo == 1
```

Quotes still needed for complex keys.

```squiggle
let {"first name": firstName} = {"first name": "Fatima"}
#=> firstName == "Fatima"
```

Computed values are supported within parentheses, just like object literals.

```squiggle
let {("a" ++ "b"): q} = {ab: "x"}
#=> q == "x"
```

If the key and the variable have the same name, you only need to write it once.

```squiggle
let {name} = {name: "Ada"}
#=> name == "Ada"
```

Extra keys are ignored in objects.

```squiggle
let {x} = {x: 10, y: 47}
#=> x == 10
```

If a key evaluates to `undefined` in the object, an error is thrown.

```squiggle
let {x} = {y: 1}
#=> error, x undefined in object
```
