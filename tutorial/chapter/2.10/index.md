---
title: "If-expression"
---

Squiggle has keywords `if` and `else`, but they're actually like JavaScript's
ternary operator (`p ? x : y`), with the exception that Squiggle throws an error
if the value being checked is not a boolean.

    console.log(if true then 3 else 4)

This will log 3 to the console.

You can nest them just like in JavaScript:

    def numberToEnglish(n)
        if n == 1 then "one"
        else if n == 2 then "two"
        else if n == 3 then "three"
        else if n == 4 then "four"
        else "some other number"

    in console.log(numberToEnglish(2))

This would be better written with a match-expression, but more on that in a
later chapter.
