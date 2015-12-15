---
title: "Operators"
---

The operators mostly work like JavaScript, but they are more restricted.

- `or`
- `and`
- `not`
- `>=`, `<=`, `<`, `>`, `==`, `!=`, `is`, `has`
- `++`, `~`
- `+`, `-`
- `*`, `/`
- `-` (unary prefix)

## Logical operators

The logical operators (`and` and `or`) work like their JavaScript counterparts (`&&` and `||`). They short-circuit just like in JavaScript, but if they evaluate a non-boolean value on either side, they throw an exception. That means you can't do `x || defaultValue`. But that is an error prone construct anyway: take for example `0 || 123`. You probably only wanted 123 if x was undefined, not if it was 0.

```squiggle
true and false
#=> false

true or false
#=> true

true or console.log("not an error, never evaluated")
#=> true
```

## Not operator

`not` is like JavaScript's `!` except it throws if you give it a non-boolean value.

```squiggle
not true
#=> false

not 4
#=> Error
```

## Comparison operators

The operators `<`, `<=`, `>`, and `>=` work like JavaScript, except they throw an error unless both values are strings or both values are numbers. It doesn't make much sense to ask if an array or an object is less than something else, so this helps avoid subtle bugs.

The operator `==` is a strict equality operator. It works like JavaScript `===` for the purpose of comparing strings, numbers, `true`, `false`, `undefined`, and `null`, but it throws an exception if you try to compare objects, arrays, or functions. This is because those types do not have well-defined value comparison, so you should implement it yourself.

As for `!=`, it's like `==` but returns the opposite value.

The operator `is` is equivalent to the ES6 function `Object.is`, [as documented
on MDN][object_is]. Basically it's like JavaScript's `===` operator except that
`0 is -0` is false, and `NaN is NaN` is true.

The operator `has` works like this is essentially like the following JavaScript function:

```javascript
function has(obj, key) {
    if (obj === null || obj === undefined) throw new Error();
    if (!validKey(key)) throw new Error();
    return obj[key] !== undefined;
}
```

Valid keys are strings and whole numbers.

```squiggle
{} has "foo"
#=> false

{a: 1} has "a"
#=> true

{} has "toString"
#=> true, comes from prototype chain

{foo: undefined} has "foo"
#=> false, it has the key "foo" but its value is undefined

{bar: null} has "bar"
#=> true, it's ok if the value is null

{"4": "four"} has 4
#=> true, integers are converted to strings

{"3.14": "pi"} has 3.14
#=> Error, non-integer numbers are illegal as keys

{"NaN": NaN} has NaN
#=> Error, non integer numbers are illegal as keys

["foo"] has 0
#=> true, there is a value other than undefined in index 0

[1, 2, undefined] has 2
#=> false, undefined at index 2

4 has "toString"
#=> true, 4 has the method toString

undefined has "toString"
#=> Error, undefined cannot have keys

null has "toString"
#=> Error, null cannot have keys
```

## Concatenation and update operators

The operator `++` is basically just syntax sugar for calling the `.concat`
method, except it forces that both arguments are real JavaScript arrays, not array-like objects such as `arguments` or `NodeList`s.

```squiggle
[0, 1] ++ [2, 3]
#=> [0, 1, 2, 3]

[] ++ ""
#=> error

1 ++ [1, 2]
#=> error

[1] ++ [2] ++ [] ++ [3, 4]
#=> [1, 2, 3, 4]
```

The operator `~` is unique to Squiggle. It is sort of like `.concat`, but for objects and key-value pairs.

```squiggle
{a: 1} ~ {b: 2}
#=> {a: 1, b: 2}

{a: 1, b: 2} ~ {a: 3}
#=> {a: 3, b: 2}

{a: 1} ~ {}
#=> {a: 1}

{a: 1} ~ {} ~ {a: 3}
#=> {a: 3}

let proto = {a: 1, b: 2}
let obj = Object.create(proto)
obj ~ {b: 4, c: 3}
#=> {b: 4, c: 3}, with prototype set to {a: 1, b: 2}
```

Here's what happens in the expression `A ~ B`:

- let `C` be the result of `Object.getPrototypeOf(A)`
- for each key `k` in `Object.keys(A)`, assign `C[k] = A[k]`
- for each key `k` in `Object.keys(B)`, assign `C[k] = B[k]`
- return `Object.freeze(C)`

This has the effect of preserving prototype chains for simple objects (useful for objects with methods stored on the prototype), while returning a new object with the desired key-value pairs set on it.

## Addition and subtraction operators

The operators `+` and `-` work like JavaScript except they throw an error unless both arguments are numbers.

```squiggle
1 + 2
#=> 3

10 - 1
#=> 9
```

## Multiplication and division operators

The operators `*` and `/` work like JavaScript except they throw an error unless both arguments are numbers.

```squiggle
2 * 3
#=> 6

1 / 2
#=> 0.5
```

## Unary minus operator

The unary minus operator `-` is like JavaScript's unary minus operator except it throws if the value is not a number. Currently there is a bug where starting a statement with a `-` can cause the parser to think you're trying to do multiline subtraction, so be sure to wrap these statements in parentheses for now.

```squiggle
-4
#=> -4

let x = 23
(-x)
#=> -23

-"foo"
#=> Error
```

[object_is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
