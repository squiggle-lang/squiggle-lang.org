---
title: "Various flow control"
---

## If-expression

Squiggle has keywords `if` and `else`, but they're actually like JavaScript's
ternary operator (`p ? x : y`), with the exception that Squiggle throws an error
if the value being checked is not a boolean.

```squiggle
console.log(if true then 3 else 4)
```

This will log 3 to the console.

You can nest them just like in JavaScript:

```squiggle
def numberToEnglish(n) =
    if n == 1 then "one"
    else if n == 2 then "two"
    else if n == 3 then "three"
    else if n == 4 then "four"
    else "some other number"

in console.log(numberToEnglish(2))
```

This would be better written with a match-expression, but more on that in a
later chapter.

## Try-expression

The keyword `try` is used to catch exceptions. Unlike JavaScript, Squiggle's
`try` produces values that can be used, rather than merely executing statements.

It is used before an expression, like `try f()` or `try foo.bar()`. The result
of a try expression is a length 2 array that looks like either `["ok", value]`
or `["fail", error]`. You can manually inspect these values using brackets, or ideally use `match` to cover both cases, like this:

```squiggle
let parse = global.JSON.parse

def safeParse(text) =
    match try parse(text)
    case ["ok", obj] => obj
    case ["fail", _error] => {}

def show(text) =
    console.log(safeParse(text))

let _ = show("[]")         #=> []
let _ = show("json error") #=> {}

in undefined
```

## Error- and throw- expressions

Squiggle has two keywords for throwing exceptions.

The most important is `error`. It is used like:

```squiggle
error "Oopsy!"
```

It throws an instance of JavaScript's `Error` with the message passed.

There is also `throw` which takes an exception and throws it:

```squiggle
throw someException

throw Error("blah blah")
```

This form is not advised, except for re-throwing exceptions caught elsewhere,
since the form `error` is much shorter.

## Await-expression

With ES2015, promises are now a core language feature. If you're not familiar
with them, check out [HTML5 Rocks][html5rocks] article about it.

You can go about using promises in Squiggle much like JavaScript:

```squiggle
httpGet(someUrl).then(fn(data) data.name)
```

But this pattern can get quite unyieldy when nested:

```squiggle
httpGet(someUrl).then(fn(profile)
    httpGet(profile.imageUrl).then(fn(image)
        writeFile(filename, image).then(fn(_)
            console.log("Image downloaded and saved!")
        )
    )
)
```

In order to solve this nesting problem, Squiggle provides a syntax sugar for
`.then`.

```squiggle
await val = somePromise in val + 2
```

This is like:

```squiggle
somePromise.then(fn(val) val + 2)
```

And can be nested like this:

```squiggle
await profile = httpGet(someUrl) in
await image = httpGet(profile.imageUrl) in
await _ = writeFile(filename, image) in
console.log("Image downloaded and saved!")
```

[html5rocks]: http://www.html5rocks.com/en/tutorials/es6/promises/
