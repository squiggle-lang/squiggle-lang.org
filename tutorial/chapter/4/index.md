---
title: "Operators"
---

The operators mostly work like JavaScript, but they are more restricted. Squiggle supports the following operators:

- `or`
- `and`
- `not`
- `>=`, `<=`, `<`, `>`, `==`, `!=`, `is`, `has`
- `++`, `~`, `..`
- `+`, `-`
- `*`, `/`
- `-` (unary prefix)

## Operators in general

Few operators in JavaScript will ever throw exceptions, but Squiggle operators throw lots of them. This is because Squiggle avoids implicit type coercions, such as considering the number `0` to be equivalent to `false` in a boolean context, or `""` to be equivalent to `false`. It also doesn't consider `"34"` to be equivalent to `34` in a numeric context. If you want this behavior, you can import the global functions `Number`, `String`, or `Boolean` and explicitly wrap your data in them, like `Number("34") + 3` or `Boolean(someNumber) and foo()`. This helps catch errors where you pass the wrong data type to a function, or where in your application `""` might be a perfectly valid string you want to use, not something "falsey".

## Logical operators

The logical operators `and` and `or` operate on boolean values and return boolean values. They short circuit, meaning that `false and foo()` will not evaluate `foo()`, and `true or bar()` will not evaluate `bar()`.

```squiggle
true and false
#=> false

true or false
#=> true

true or console.log("not an error, never evaluated")
#=> true
```

## Not operator

`not true` gives `false`, and `not false` gives `true`. Any non-boolean input to `not` throws an exception.

```squiggle
not true
#=> false

not 4
#=> Error
```

## Comparison operators

The operators `<`, `<=`, `>`, and `>=` only work on numbers.

The operator `==` is a strict equality operator. It works like JavaScript `===` for the purpose of comparing strings, numbers, `true`, `false`, `undefined`, and `null`, but it throws an exception if you try to compare objects, arrays, or functions. This is because those types do not have well-defined value comparison, so you should implement it yourself.

As for `!=`, it's like `==` but returns the opposite value.

The operator `is` is equivalent to the ES6 function `Object.is`, [as documented
on MDN][object_is]. Basically it's like JavaScript's `===` operator except that
`0 is -0` is false, and `NaN is NaN` is true. Unlike `==`, `is` can be used to compare objects, arrays, or functions.

The operator `has` works essentially like the following JavaScript function:

```javascript
function has(obj, key) {
    if (obj === null || obj === undefined) throw new Error();
    if (typeof key !== "string") throw new Error();
    return obj[key] !== undefined;
}
```

Valid keys are strings.

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
#=> Error, integers are not converted to strings

["foo"] has "0"
#=> true, there is a value other than undefined at key "0"

[1, 2, undefined] has "2"
#=> false, undefined at key "2"

4 has "toString"
#=> true, 4 has the method toString

undefined has "toString"
#=> Error, undefined cannot have keys

null has "toString"
#=> Error, null cannot have keys
```

## Concatenation and update operators

The expression `a .. b` is string concatenation. It's implemented as JS with `"" + a + b`, and it asserts `a` and `b` are not objects.

```squiggle
"foo" .. "bar"
#=> "foobar"

"x" .. 1
#=> "x1"

1 .. 2
#=> "12"

"hey" .. {uh: "oh"}
#=> Error, cannot strcat objects

"nope" .. [1, 2]
#=> Error, cannot strcat array

undefined .. null .. true .. false
#=> "undefinednulltruefalse"
```

The expression `a ++ b` is basically just syntax sugar for calling the `a.concat(b)` method, except it forces that both arguments are real JavaScript arrays, not array-like objects such as `arguments` or the return value of `document.querySelectorAll`.

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

The operators `+` and `-` only work on numbers.

```squiggle
1 + 2
#=> 3

10 - 1.5
#=> 8.5
```

## Multiplication and division operators

The operators `*` and `/` only work on numbers.

```squiggle
2 * 3
#=> 6

1 / 2
#=> 0.5
```

## Unary minus operator

The unary minus operator `-` only works on numbers.

*Note:* Currently there is a bug where starting a statement with a `-` can cause the parser to think you're trying to do multiline subtraction, so be sure to wrap these statements in parentheses for now.

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
