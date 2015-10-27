---
layout: default
title: Squiggle
bodyClass: narrow
cssTab1: focus
---

Squiggle makes JavaScript stricter and simpler. It is expression oriented and
actively discourages mutation. It is influenced by Python, Clojure, Lua,
Haskell, and more.

JavaScript interop is free because Squiggle does not introduce new datatypes. It
does not introduce a new build system or new package manager. Squiggle is a
language optimized for humans. It is intended to be helpful (by throwing errors)
and powerful (by including features JS does not) before it is meant to be fast.

Check out [the tutorial](tutorial) for more information, or [try it out](try)
with a live compiler that runs in your browser.

## Example

    let http = require "http"

    let port = 1337
    let host = "127.0.0.1"

    def handler(res, res) =
        let headers = {"Content-Type": "text/plain"}
        let _ = res.writeHead(200, headers)
        let _ = res.end("Hello world\n")
        in undefined

    let server = http.createServer(handler)
    let _ = server.listen(port, host)
    let _ = console.log("Server running at http://" ++ host + ":" ++ port ++ "/")
    in undefined

## Features

- Arity checked functions: `def f(x) = x in f(1, 2)` throws
- Named-this: `def myMethod(@this, x)`
- Rest parameters: `def concat(first, second, ...rest)`
- ES2015-style temporal deadzone on variables:
  illegal to use variables before initialization
- Immutable (frozen) array/object literals
- Operators for concatenation and object updates
- Pattern matching
- No type coercion in binary operators
- ES2015-style shorthand object literals: `{foo}` means `{foo: foo}`
- Concise function syntax: `fn(x, y) x + y`
- Easier errors: `error "oopsy"` vs `throw new Error("oopsy")` from JS
- try as an expression: `match try foo(x) case ["ok", v] => ... case ["fail", e] => ... end`
- foo.bar throws an exception unless `foo.bar !== undefined`
- `==` provides a deep equality check
