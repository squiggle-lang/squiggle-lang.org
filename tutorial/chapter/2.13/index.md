---
title: "Try-expression"
---

The keyword `try` is used to catch exceptions. Unlike JavaScript, Squiggle's
`try` produces values that can be used, rather than merely executing statements.

It is used before an expression, like `try f()` or `try foo.bar()`. The result
of a try expression is a length 2 array that looks like either `["ok", value]`
or `["fail", error]`. You can manually inspect these values using brackets, or ideally use `match` to cover both cases, like this:

    let parse = global.JSON.parse
    def safeParse(text)
        match try parse(text)
        case ["ok", obj] => obj
        case ["fail", _error] => {}
        end
    let _ = console.log(safeParse("[]")) #=> []
    let _ = console.log(safeParse("json error")) #=> {}
    in undefined
