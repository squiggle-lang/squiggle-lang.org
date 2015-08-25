---
title: "Match-expression"
layout: chapter
section: 2
subsection: 12
---

Overall structure looks like:

    match (V) {
      case P1 => X1
      case P2 => X2
      case P3 => X3
    }

The inidividual pieces look like this:

    [p1, p2, p3]

Matches an array of size 3 and binds the three patterns inside.

    {a, b, "c": p1}

Matches an object with at least the properties "a", "b", and "c", applying the p1 pattern to the value at "c".

    x

Just a plain variable name. Always passes and is bound with the value at its position in the pattern.

    _x
    _

Technically also just a variable name pattern, but used to ignore values.

    "hello"
    342
    true
    false
    undefined
    null

Assert the value at that position in the pattern is equal to that.
