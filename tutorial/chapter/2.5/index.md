---
title: "Literals"
---

## Named literals

`true`, `false`, `null`, and `undefined` are all basically
the same in Squiggle as with JavaScript.

Additionally, `global` is a named literal that refers to the global context.

## Numbers

Numbers are basically the same as JS, with two exceptions: `NaN` and `Infinity`
are actually considered named numbers, rather than global variables. Also, you
can include `_` in the middle of your numbers for readability, like:
`1_000_000.999`.

## Strings

Currently only double-quoted string literals are supported (no 'single quotes').

The supported escape characters are: `\n` `\t` `\r` `\"` `\\`. These have the
same meaning as in JavaScript.

Strings also support the new ES2015 syntax for specifying Unicode characters:

    "\u{CODEPOINT}"

Where *CODEPOINT* is the Unicode code point of the character you want, like:

    "\u{20e}" == "Ȏ"

## Arrays

Arrays are slightly different: they are automatically wrapped in a call to
`Object.freeze`. This makes it so no elements in the array can change after it's
created. That means no `myArray.push(4)`. JavaScript arrays already have a
`.concat` method for adding elements to a copy of the array.

    []
    [1, 2, 3]
    [[], []]
    [[1, 2, 3], [[1], [2], []]]
    ["hello", "world"]

## Objects

Objects are wrapped in calls to `Object.freeze` so it's easy to make immutable
data. Making new objects with updated properties is done via the `~` operator
covered later.

Object keys work like JavaScript in that they can be plain identifiers or string
literals, but Squiggle also allows you to compute property names by wrapping
them in parentheses.

    {}
    {a: "b"}
    {"hello world": "Hello, world!"}
    {key: 400, x: null, y: undefined, o: {}}
    {("a" ++ "b"): someStringVariable}

## Functions

Functions in Squiggle automatically have arity checking added. That means that
if you call a function with too many or too few arguments, it will throw an
error. Functions use `fn` and don't use braces or `return`.

    fn(x) x + 1
    fn(x, y) x + y
    fn() Math.floor(Math.random() * 100)

Let's take `fn(x, y) x + y` as an example and compare that with how you'd
express the same thing in JavaScript. It might look a lot like this function:

    function(x, y) { return x + y; }

But arity checking means that it's actually more like this JavaScript function:

    function(x, y) {
        if (arguments.length !== 2) {
            throw new Error("wrong number of arguments");
        }
        return x + y;
    }

JavaScript's usual relaxed rules around argument count can lead to extremely
subtle and hard to detect bugs. It's potentially more flexible the JavaScript
way, but much more error-prone.

Sometimes APIs are much easier if they can have varying parameter counts, so it
is still possible in Squiggle. Using `...` in front of your last parameter
causes it so collect all of the extra parameters in an array.

    fn(first, second, ...rest) second

This function can be called like `foo(1, 2, 3, 4, 5)` and will return `2`. It
would fail if called like `foo(1)` because it needs at least two parameters.

JavaScript's `this` is a source of much confusion and pain. In order to help
avoid mistakes, functions have to explicitly declare their use of JavaScript's
`this`. It looks like the following:

    fn(@this) this.name

If the first parameter starts with `@`, that variable is assigned the value of
`this`. In this way, you can nest functions and always use the correct `this`
value by giving it the name you want.

    fn(@self)
        fn()
            self.x

    fn(@me)
        fn(@them)
            [me, them]

Any variable for an `@` binding.

Functions can also optionally have names, like in JavaScript

    fn foo(x) x + 1

This is useful for functions that need to refer to themselves, like:

    fn forever(f)
        if done
        then undefined
        else
            let _ = f()
            let _ = setTimeout(forever, 300)
            in undefined
