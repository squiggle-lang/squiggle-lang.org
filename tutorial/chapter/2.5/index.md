---
title: "Literals"
---


Numbers, strings, `true`, `false`, `null`, and `undefined` are all exactly
identical in Squiggle.

    100
    3.14
    "hello"
    ""
    true
    false
    null
    undefined

Currently only double-quoted string literals are supported (no 'single quotes'), and escape characters do not work (e.g. `\"`, `\n` ).

Arrays are slightly different: they are automatically wrapped in a call to
`Object.freeze`. This makes it so no elements in the array can change after it's
created. That means no `myArray.push(4)`. JavaScript arrays already have a
`.concat` method for adding elements to a copy of the array.

    []
    [1, 2, 3]
    [[], []]
    [[1, 2, 3], [[1], [2], []]]
    ["hello", "world"]

Objects are also wrapped in `Object.freeze`, though JavaScript does not provide
an easy way to add key-value pairs to a copy of an object. Squiggle will
eventually provide a convenient function for doing that. Also, Squiggle objects require quoting keys, because you can use computed values.

    {}
    {"a": "b"}
    {"hello world": "Hello, world!"}
    {"key": 400, "x": null, "y": undefined, "o": {}}
    {someStringVariable: someStringVariable}

Functions are wrapped in `Object.freeze` as well. Functions in JavaScript can
normally have properties added afterwards, but freezing them disables that.
Also, functions in Squiggle automatically have arity checking added. That means
that if you call a function with too many or too few arguments, it will throw an
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
subtle and hard to detect bugs.  It's potentially more flexible the JavaScript
way, but much more error-prone.
