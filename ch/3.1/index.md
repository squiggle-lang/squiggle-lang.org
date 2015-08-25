---
title: "Predefined functions"
---

Unless otherwise stated, all predefined functions throw an error if called with
the wrong number of parameters.

## print

`print(x)` is equivalent to:

    do { console.log(x); x; }

## not

`not(true)` gives `false`.

`not(false)` gives `true`.

## isNan

`isNan(NaN)` gives `true`.

`isNan(n)` where `n` is a number other than `NaN` gives `false`.

## map

`map(f, xs)` is equivalent to:

    fn(f, xs) xs.map(fn(x, _i, _a) f(x))

## join

`join(separator, xs)` is equivalent to:

    xs.join(separator)

## foldLeft

`foldLeft(f, z, xs)` is equivalent to:

    xs.reduce(f, z)

## fold

`fold` is equivalent to `foldLeft`.

## reduce

`reduce(f, xs)` is equivalent to:

    xs.reduce(f)

## foldRight

`foldRight(f, z, xs)` is equivalent to:

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

`get(k, obj)` is equivalent to:

    obj[k]

## set

`set(k, v, obj)` is equivalent to:

    obj[k] = v

## methodGet

`methodGet(name, obj)` is equivalent to:

    obj[name].bind(obj)
