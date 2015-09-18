---
title: "Predefined functions"
---

Unless otherwise stated, all predefined functions throw an error if called with
the wrong number of parameters.

## map

`map(xs, f)` is equivalent to:

    fn(f, xs) xs.map(fn(x, _i, _a) f(x))

## join

`join(xs, separator)` is equivalent to:

    xs.join(separator)

## foldLeft

`foldLeft(xs, f, z)` is equivalent to:

    xs.reduce(f, z)

## fold

`fold` is equivalent to `foldLeft`.

## reduce

`reduce(xs, f)` is equivalent to:

    xs.reduce(f)

## foldRight

`foldRight(xs, f, z)` is equivalent to:

    reverse(xs).reduce(flip(f), z)

## reverse

`reverse(xs)` returns an array like `xs` but with its elements in reverse order.

## isEmpty

`isEmpty(xs)` is equivalent to:

    xs.length = 0

## head

`head(xs)` is equivalent to:

    xs[0]

## tail

`tail(xs)` is equivalent to:

    xs.slice(1)

## toArray

`toArray(xs)` is equivalent to:

    [].slice.call(xs)

## flip

`flip(f)` is equivalent to:

    fn(a, b) f(b, a)

## get

`get(obj, k)` is equivalent to:

    obj[k]

## set

`set(obj, k, v)` is equivalent to:

    obj[k] = v
