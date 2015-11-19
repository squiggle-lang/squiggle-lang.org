---
title: "Variable bindings"
---

TODO: Clean this up since `let` and `match` are almost the same thing.

## The Let-expression

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

## The Match-expression

Pattern matching is one of the most powerful and expressive features of
Squiggle. If you've never used it before, think of it as the most useful way to
extra values from arrays or objects, as well as check for equality. It might
look a bit like a large `if`/`else` structure, but it does more.

Overall structure looks like:

```squiggle
match V
case P1 => X1
case P2 => X2
case P3 => X3
```

In this example, `V` is the value you want to match on. `P1`, `P2`, and `P3` are
patterns. The first pattern to fully match wins, resulting in the value to the
right of its `=>` arrow. If no patterns are matched, it throws an exception.

Here are the pattern types:

## Identifier bindings

A plain identifier matches any value and binds it to the value at that position
in the associated expression. For example, this prints "4".

```squiggle
match 4
case x => console.log(4)
```

You can ignore a value by using `_` as the variable name:

```squiggle
match 123
case _ => "I didn't care about the value anyway"
```

## Literals

A basic literal like a string of a number:

```squiggle
console.log(
    match "hey"
    case 56 => "This won't match!"
    case "bye" => "I never get matched..."
    case "hey" => "Hey buddy! This one matches"
)
```

## Arrays

You can also match arrays. Arrays are assumed to be *exactly* the size
specified, and the pattern won't match otherwise.

```squiggle
match [1, 2, 3]
case [x, y, z] => x + y + z
```

However, if you use the slurpy array pattern, you can deal with arrays of
*at least* the size specified, collecting the rest of the elements in another
pattern. The following matches arrays of *at least* length 2, and prints
`[6, 7, 8]`.

```squiggle
match [4, 5, 6, 7, 8]
case [a, b, ...xs] => console.log(xs)
```

Also note that Squiggle's `match` does not differentiate between real arrays such as `[a, b, c]` and array-like objects such as
`{"0": a, "1": b, "2", c, "length": 3}`.

## Objects

Objects in JavaScript are a little more complicated than arrays, due to
prototype chains and rarely being truly empty. Due to this, object patterns
ignore extra properties, only caring if the ones specified exist. Properties are
checked all the way up the prototype chain, not just own-properties.

```squiggle
match global
case {Number: Number} =>
    console.log(Number("34"))
```

Because object patterns ignore extra properties, the following match succeeds:

```squiggle
match {a: 1}
case {} => "potato"
```

Because arrays are also objects, the following match succeeds:

```squiggle
match [4, 5, 6]
case {length: n} => n
```

Also, there's a shorthand for the common case of key and value names being the
same. Normally you would write:

```squiggle
match obj
case {name: name} => name
```

But it's possible with the shorthand notation to write:

```squiggle
match obj
case {name} => name
```

Object and array patterns can be nested within each other to match and extract
values from deep structures.

Also, you can use computed values at any point in a match expression by wrapping
it in parentheses:

```squiggle
let K = {
    w: "w".charCodeAt(0),
    a: "a".charCodeAt(0),
    s: "s".charCodeAt(0),
    d: "d".charCodeAt(0)
}
let dir =
    match event.which
    case (K.w) => "up"
    case (K.a) => "left"
    case (K.s) => "down"
    case (K.d) => "right"
in console.log(dir)
```
