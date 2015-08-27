---
title: "Error- and throw- expressions"
---

Squiggle has two keywords for throwing exceptions.

The most important is `error`. It is used like:

    error "Oopsy!"

It throws an instance of JavaScript's `Error` with the message passed.

There is also `throw` which takes an exception and throws it:

    throw someException

    throw Error("blah blah")

This form is not advised, except for re-throwing exceptions caught elsewhere,
since the form `error` is much shorter.
