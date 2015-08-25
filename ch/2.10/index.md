---
title: "If-expression"
layout: chapter
section: 2
subsection: 10
---

Squiggle has keywords `if` and `else`, but they're actually like JavaScript's
ternary operator (`p ? x : y`), with the exception that Squiggle throws an error
if the value being checked is not a boolean.

    console.log(if (true) 3 else 4)

This will log 3 to the console.

You can nest them just like in JavaScript:

    let (
        numberToEnglish = fn(n)
            if (n = 1) "one"
            else if (n = 2) "two"
            else if (n = 3) "three"
            else if (n = 4) "four"
            else "some other number"
    ) console.log(numberToEnglish(2))

This would be better written with a match-expression, but more on that in a
later chapter.
