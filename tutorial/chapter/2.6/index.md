---
title: "Operators"
---

The golden rule of Squiggle, and especially of operators, is *it works like how JavaScript probably should work, in my opinion*.

Here are the binary operators in order, from Squiggle:

- `|>`
- `and`, `or`
- `>=`, `<=`, `<`, `>`, `=`, `!=`
- `++`
- `+`, `-`
- `*`, `/`

## Pipe operator

The pipe operator (`|>`) is like calling a function but backwards and without
parentheses. Normally you would write `g(f(x))`, but with the pipe operator you
can write `x |> f |> g`. This allows you to think left-to-right about your
function pipelines.

    Math.random() * 10 |> Math.floor |> console::log

## Logical operators

The logical operators (`and` and `or`) work like their JavaScript counterparts
(`&&` and `||`). They short-circuit just like in JavaScript, but if they
evaluate a non-boolean value on either side, they throw an exception. That means
you can't do `x || defaultValue`. But that is an error prone construct anyway:
take for example `0 || 123`. You probably only wanted 123 if x was undefined,
not if it was 0.

    true and false # => false
    true or false # => true
    true or do {
        console.log(
            "I would be an error, " ++
            "but I don't get evaluated!"
        )
        "potato";
    } # => true

## Comparison operators

The operators `<`, `<=`, `>`, and `>=` work like JavaScript, except they throw
an error unless both values are strings or both values are numbers. It doesn't
make much sense to ask if an array or an object is less than something else, so
this helps avoid subtle bugs.

The operator `=` is a deep equality operator. It works like JavaScript `===` for
the purpose of comparising strings, numbers, `true`, `false`, `undefined`,
`null`, and functions, but differs for arrays, and objects.

For arrays, it checks to see if all elements of both arrays are equal to each
other based on the Squiggle `=` operator. It is not aware of sparse arrays.

For objects, it checks all keys returned by `Object.keys` on both objects for
equality using the Squiggle `=` operator.

As for `!=`, it's like `=` but returns the opposite value.

    [] = [] # => true
    [2] = [1 + 1] # => true
    ["abc", "xyz"] = ["abc", "xy" ++ "z"] # => true
    {"a": "b"} = {"a": "b"} # => true
    {} = Object.create(null) # => true

## Concatenation operators

The operator `++` is basically just syntax sugar for calling the `.concat`
method. As such, it works on arrays or strings, like `[1] ++ [2, 3]` or `"abc"
++ "xyz"`. It will throw an error unless the arguments are either both strings
or both arrays.

    "abc" ++ "123" # => "abc123"
    [0, 1] ++ [2, 3] # => [0, 1, 2, 3]
    [] ++ "" # => error
    1 ++ [1, 2] # => error

## Addition and subtraction operators

The operators `+` and `-` work like JavaScript except they throw an error unless
both arguments are numbers.

    1 + 2 # => 3
    10 - 1 # => 9

## Multiplication and division operators

The operators `*` and `/` work like JavaScript except they throw an error unless
both arguments are numbers.

    2 * 3 # => 6
    1 / 2 # => 0.5
