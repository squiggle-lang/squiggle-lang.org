---
title: "Await-expression"
---

With ES2015, promises are now a core language feature. If you're not familiar
with them, check out [HTML5 Rocks][html5rocks] article about it.

You can go about using promises in Squiggle much like JavaScript:

    httpGet(someUrl).then(fn(data) data.name)

But this pattern can get quite unyieldy when nested:

    httpGet(someUrl).then(fn(profile)
        httpGet(profile.imageUrl).then(fn(image)
            writeFile(filename, image).then(fn(_)
                console.log("Image downloaded and saved!")
            )
        )
    )

In order to solve this nesting problem, Squiggle provides a syntax sugar for
`.then`.

    await val = somePromise in val + 2

This is like:

    somePromise.then(fn(val) val + 2)

And can be nested like this:

    await profile = httpGet(someUrl) in
    await image = httpGet(profile.imageUrl) in
    await _ = writeFile(filename, image) in
    console.log("Image downloaded and saved!")

[html5rocks]: http://www.html5rocks.com/en/tutorials/es6/promises/
