---
title: "Let, Match, and Patterns"
---

## The Let-statement

You've already seen the most basic form of `let`:

```squiggle
let x = 1
```

This is essentially equivalent to the ES2015 code:

```javascript
const x = 1;
```

If you're unfamiliar with `const`, essentially it means that the variable `x` cannot be assigned to again, and that any code run before that statement which tries to use `x` will throw an exception.

## No use before definition

In Squiggle, it is a runtime error to use a variable before it has been defined (this is like the ES2015 concept "temporal deadzone", which applies to `let/const` declarations in that language).

Compare with JavaScript, which prints `undefined` three times in this example.

```javascript
var x = y;
var y = x;
var z = z;
console.log(x, y, z);
```

This is because of JavaScript's `var` hoisting, which makes the following code work more like this:

```javascript
var x = undefined;
var y = undefined;
var z = undefined;
x = y;
y = x;
z = z;
console.log(x, y, z);
```

The following code in Squiggle would throw an error trying to define `x`.

```squiggle
let x = y
let y = x
let z = z
console.log(x, y, z)
```

## Destructuring

The basic form of let is `let name = value`, but the `name` part can actually be shaped like an array or object, in order to pluck values from the right hand side.

## Patterns

### Arrays

Basically just write an array on the left, including a "..." before the last item to gobble up all remaining items. Number of items must match.

Two item array:

```squiggle
let [x, y] = [1, 2]
#=> x == 1
#=> y == 2
```

Too few items:

```squiggle
let [x, y] = [1]
#=> error, too few items to unpack
```

Too many items:

```squiggle
let [x, y] = [1, 2, 3, 4]
#=> error, too many items to unpack
```

Rest array example 1:

```squiggle
let [x, ...xs] = [1, 2, 3, 4]
#=> x == 1
#=> xs == [2, 3, 4]
```

Rest array example 2:

```squiggle
let [x, ...xs] = [1]
#=> x == 1
#=> x == []
```

Too few items for rest array:

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

### Ignore

The special identifier `_` can be used to ignore values. This is useful for  ignoring values in arrays or objects.

```squiggle
let [_, y, _] = [1, 2, 3]
#=> y == 2

let [_, ...xs] = [4, 5, 6, 7]
#=> xs == [5, 6, 7]

let [x, ...] = [3, 9]
#=> x == 3
```

Note that when using a `...` pattern you can omit the identifier and it's assumed to be `_`.

## The Match-expression

The `match` expression is like the above destructuring assignment patterns combined with `if/else`.

```squiggle
match V
case P1 then X1
case P2 then X2
case P3 then X3
else Xn
end
```

In this example, `V` is the value you want to match on. `P1`, `P2`, and `P3` are patterns. The first pattern to fully match wins, resulting in the value to the right of its `then`. If no patterns are matched, it throws an exception. The else clause is equivalent to `case _`, it will match any value.

All the pattern types from destructuring assignment are supported, in addition to matching value-based object literals: numbers, strings, `true`, `false`, `undefined`, `null`, `NaN`, and `Infinity`.

```squiggle
console.log(
    match "hey"
    case 56 then "This won't match!"
    case "bye" then "I never get matched..."
    case x then "You said " .. x
    end
)
```

You can also just supply an expression to `case` at the top level by wrapping it in parentheses.

```squiggle
let K = {
    w: "w".charCodeAt(0),
    a: "a".charCodeAt(0),
    s: "s".charCodeAt(0),
    d: "d".charCodeAt(0)
}

let dir =
    match event.which
    case (K.w) then "up"
    case (K.a) then "left"
    case (K.s) then "down"
    case (K.d) then "right"
    end

console.log(dir)
```
