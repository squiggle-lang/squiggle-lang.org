---
title: "Various flow control"
---

## If-expression

Squiggle has keywords `if` and `else`, but they're actually like JavaScript's ternary operator (`p ? x : y`), with the exception that Squiggle throws an error if the value being checked is not a boolean.

Note that the `else` clause is **not** optional. It must be present in all if-expressions.

```squiggle
console.log(
  if true then
    3
  else
    4
  end
)
```

This will log `3` to the console.

If you have more than two cases, you can use `elseif`:

```squiggle
def numberToEnglish(n) do
  if n == 1 then "one"
  elseif n == 2 then "two"
  elseif n == 3 then "three"
  elseif n == 4 then "four"
  else "some other number"
  end
end

console.log(numberToEnglish(2))
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
let {JSON} = global

def safeParse(text) do
  match try JSON.parse(text)
  case ["ok", obj] then obj
  case ["fail", _] then {}
  end
end

def show(text) do
  console.log(safeParse(text))
end

show("[1, 2]")
#=> [1, 2]

show("json error")
#=> {}
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
match try someFunction()
case ["ok", value] then
  # use the value
case ["fail", err] then
  # do some clean up
  throw err
end
```

This form is not advised, except for re-throwing exceptions caught elsewhere, since the form `error` is much shorter.

## Await-expression

With ES2015, promises are now a core language feature. If you're not familiar with them, check out the [HTML5 Rocks][html5rocks] article about it.

You can use promises in Squiggle much like JavaScript:

```squiggle
httpGet(someUrl).then(fn(data) data.name)
```

But this pattern can get quite unyieldy when nested:

```squiggle
httpGet(someUrl).then(fn(profile) do
  httpGet(profile.imageUrl).then(fn(image) do
    writeFile(filename, image).then(fn(...) do
        console.log("Image downloaded and saved!")
    end)
  end)
end)
```

In order to solve this nesting problem, Squiggle provides a syntax sugar for `.then`.

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
