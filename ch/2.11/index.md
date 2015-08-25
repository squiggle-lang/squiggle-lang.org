---
title: "Do-expression"
layout: chapter
section: 2
subsection: 11
---

In Squiggle, everything is an expression, but sometimes you still need to call
functions purely for their side effects. For example, take this function in
JavaScript:

    function sneakyAdd(x, y) {
        console.log("add was called with", x, y);
        return x + y;
    }
    sneakyAdd(3, 4);

Given that Squiggle automatically returns the body of a function, there has to be a way to ignore a value you don't want. The keyword `do` introduces a block that returns only the last value:

    let (
        sneakyAdd = fn(x, y) do {
            console.log("add was called with", x, y);
            x + y;
        }
    ) sneakyAdd(3, 4)

The `do` -expression is flexible and can be used anywhere in Squiggle, not just
function bodies.

    do {
        console.log("Hello");
        console.log("World");
    }

Statements within a `do` expression must be ended with a semicolon. There is no
automatic semicolon insertion, like JavaScript.
