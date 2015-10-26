---
title: "Match-expression"
---

Pattern matching is one of the most powerful and expressive features of
Squiggle. If you've never used it before, think of it as the most useful way to
extra values from arrays or objects, as well as check for equality. It might
look a bit like a large `if`/`else` structure, but it does more.

Overall structure looks like:

    match V
    case P1 => X1
    case P2 => X2
    case P3 => X3
    end

In this example, `V` is the value you want to match on. `P1`, `P2`, and `P3` are
patterns. The first pattern to fully match wins, resulting in the value to the
right of its `=>` arrow. If no patterns are matched, it throws an exception.

Here are the pattern types:

## Identifier bindings

A plain identifier matches any value and binds it to the value at that position
in the associated expression. For example, this prints "4".

    match 4
    case x => console.log(4)
    end

You can ignore a value by using an identifier starting with an underscore, just
like in functions:

    match 123
    case _x => "I didn't care about the value anyway"
    end

## Literals

A basic literal like a string of a number:

    console.log(
        match "hey"
        case 56 => "This won't match!"
        case "bye" => "I never get matched..."
        case "hey" => "Hey buddy! This one matches"
        end
    )

## Arrays

You can also match arrays. Arrays are assumed to be *exactly* the size
specified, and the pattern won't match otherwise.

    match [1, 2, 3]
    case [x, y, z] => x +  y + z
    end

However, if you use the slurpy array pattern, you can deal with arrays of
*at least* the size specified, collecting the rest of the elements in another
pattern. The following matches arrays of *at least* length 2, and prints
`[6, 7, 8]`.

    match [4, 5, 6, 7, 8]
    case [a, b, ...xs] => console.log(xs)
    end

Also note that Squiggle's `match` does not differentiate between real arrays such as `[a, b, c]` and array-like objects such as
`{"0": a, "1": b, "2", c, "length": 3}`.

## Objects

Objects in JavaScript are a little more complicated than arrays, due to
prototype chains and rarely being truly empty. Due to this, object patterns
ignore extra properties, only caring if the ones specified exist. Properties are
checked all the way up the prototype chain, not just own-properties.

    match global
    case {Number: Number} =>
        console.log(Number("34"))
    end

Because object patterns ignore extra properties, the following match succeeds:

    match {a: 1}
    case {} => "potato"
    end

Because arrays are also objects, the following match succeeds:

    match [4, 5, 6]
    case {length: n} => n
    end

Also, there's a shorthand for the common case of key and value names being the
same. Normally you would write:

    match obj
    case {name: name} => name
    end

But it's possible with the shorthand notation to write:

    match obj
    case {name} => name
    end

Object and array patterns can be nested within each other to match and extract
values from deep structures.

Also, you can use computed values at any point in a match expression by wrapping
it in parentheses:

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
        end
    in console.log(dir)
