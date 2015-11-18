---
layout: home
title: Squiggle
bodyClass: narrow
---

## Hello, world!

```squiggle
let {console} = global
in console.log("Hello, world!")
```

Check out [the compiler][squiggle] on GitHub.

## Features

<div class="feature-list">
    <div class="feature">
        <h3>Arity checked functions</h3>
        <p>
            Calling a function made in Squiggle with the wrong number of
            arguments throws an exception.
        </p>
    </div>
    <div class="feature">
        <h3>Named-this</h3>
        <p>
            JavaScript's <code>this</code> becomes a normal named parameter,
            making it easy to nest functions and use callbacks.
        </p>
    </div>
    <div class="feature">
        <h3>Rest parameters</h3>
        <p>
            No more mucking around with <code>arguments</code>, simply name the extra arguments like <code>...args</code>.
        </p>
    </div>
    <div class="feature">
        <h3>Temporal deadzone</h3>
        <p>
            Just like ES2015, it's illegal to use a variable before it's initialized, eliminating an entire class of errors.
        </p>
    </div>
    <div class="feature">
        <h3>Frozen literals</h3>
        <p>
            Array and object literals are frozen with <code>Object.freeze</code> by default, so you can't accidentally mutate them.
        </p>
    </div>
    <div class="feature">
        <h3>Easy updates</h3>
        <p>
            Simple operators <code>++</code> to concatenate two arrays or two strings, and <code>~</code> to merge two objects into a new frozen object with the prototype of the first object.
        </p>
    </div>
    <div class="feature">
        <h3>Destructuring assignment</h3>
        <p>
            Grab object properties or array elements when you assign variables, like: <code>let [x, y] = [1, 2]</code> or <code>let {x, y} = {x: 1, y: 2}</code>.
        </p>
    </div>
    <div class="feature">
        <h3>Pattern matching</h3>
        <p>
            Like JS <code>switch</code> but with destructuring power built-in and no dangerous fall-through.
        </p>
    </div>
    <div class="feature">
        <h3>No type coercion</h3>
        <p>
            Standard operators like <code>+</code>, <code>-</code>, <code>*</code>, and more, have been replaced with strict version that do not perform any type coercions, throwing exceptions on bad inputs.
        </p>
    </div>
    <div class="feature">
        <h3>Concise function syntax</h3>
        <p>
            Functions are simple: <code>xs.map(fn(x) x + 1)</code>.
        </p>
    </div>
    <div class="feature">
        <h3>Easy errors</h3>
        <p>
            Simple <code>error "some message"</code> to throw an error with the desired message.
        </p>
    </div>
    <div class="feature">
        <h3>Expression try/catch</h3>
        <p>
            <code>try/catch</code> rethought as an operator producing <code>["ok", value]</code> or <code>["fail", error]</code> as its result. Pairs well with pattern matching.
        </p>
    </div>
    <div class="feature">
        <h3>Safer property access</h3>
        <p>
            The expression <code>foo.bar</code> throws an error if "bar" is undefined in foo.
        </p>
    </div>
    <div class="feature">
        <h3>Deep equality</h3>
        <p>
            The operator <code>==</code> performs a deep equality check.
        </p>
    </div>
</div>

## Squiggle + Node.js HTTP Server

```squiggle
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
```

[squiggle]: https://github.com/wavebeem/squiggle
