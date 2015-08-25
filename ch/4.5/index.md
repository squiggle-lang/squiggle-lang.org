---
title: "An argument about arguments"
---

Variadic functions are another source of confusion and not much value in
JavaScript, so those are also not allowed in Squiggle. As such, the `arguments`
magic variable is useless for Squiggle functions.

Take for example this JavaScript snippet:

    [10, 10, 10, 10].map(parseInt) // => [10, NaN, 2, 3]

This happens because `parseInt` takes an optional second parameter specifying
the numeric base to parse using (rather than normal base-10 numbers), and `map`
passes the array `index` as the second parameter, which is used by `parseInt`.
Oops! It may seem gratuitous, but the Squiggle way would be having
`parseInt(string)` and `parseIntWithBase(string, number)` as separate functions.

Variadic functions can still be used via Squiggle, but there is currently no
support for creating them, since I believe they cause more harm than good.
