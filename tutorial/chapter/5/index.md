---
title: "Properties and function calls"
---

## Property access

Property access is a bit different than JavaScript, so that Squiggle can help you out with potential programming errors.

Dots are still used to get keys in most cases, but `{braces}` are used instead of `[brackets]` to get dynamic values. Both forms throw an error unless `obj has key`.

```squiggle
let object = {property: "Foo"}

object.property
#=> "Foo"

object{"property"}
#=> "Foo"

let name = "property"
object{name}
#=> "Foo"
```
If you want to safely access a key but fall back to some other behavior, use this snippet:

```squiggle
def get(obj, key, fallback) do
  if obj has key
  then obj{key}
  else fallback
  end
end

let user = get(getUser(), "name", "(no name)")
```

## Index access

Accessing an item from an array by its index looks just like JavaScript, but also support negative indices, and throws an exception if the index is out of range, or the value you're trying to index isn't an array, or if the key is not an integer.

```squiggle
["a", "b", "c"][1]
#=> "b"

["item"]["0"]
#=> Error, index not an integer

["data", "stuff"][2.000001]
#=> Error, index not an integer

[][0]
#=> Error, index out of range

["a", "b", "c"][-2]
#=> "b"

["x", "y", "z"][-4]
#=> Error, index out of range
```

## Function and method calls

Function and method calls work pretty much exactly like in JavaScript:

```squiggle
foo(1, 2, 3)

bar()

console.log("Hello!", "world")

document.querySelector("body .myClass")
```
