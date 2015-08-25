---
title: "Property access"
---

Property access is written just like JavaScript. The only difference is that in
Squiggle these will throw exceptions if `property` is not an own-property of
`object`.

    object.property
    object["property"]
    let (name = "property") in object[name]

There will eventually be useful functions for dealing with optionally present
values.
