---
title: "Comments"
---

Comments start with `#` and extend to the end of the line. All text within
comments is ignored by Squiggle and not passed on to the generated JavaScript
output.

```squiggle
# This is ignored.
# This is also ignored.
# And this.
let console = global.console
let realCode = "potato" # comment
# comment again
in console.log(realCode) # comment 3
# final comment
```
