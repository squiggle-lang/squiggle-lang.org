---
layout: default
title: Squiggle
bodyClass: narrow
cssTab3: focus
---

<h1><a href="#">Why Squiggle?</a></h1>

You might be wondering why you should use Squiggle. After all, JavaScript is
better than ever, and there are many new contenders for "cool compile-to-
JavaScript" language right now.

Obviously, if I was satisfied with the selection of compile-to-JS languages, I
wouldn't have made Squiggle. So first I'll lay out some of the core things I
value in Squiggle, and then compare Squiggle to other languages.

<h2 id="whats-good"><a href="#whats-good">What's good?</a></h2>

<h3 id="syntax"><a href="#syntax">Simple syntax</a></h3>

Squiggle does not use semicolons, and indentation does not matter. Arrays,
objects, strings, and numbers are all written like JS, so it's easy to pick up.

<h3 id="arity"><a href="#arity">Arity checking</a></h3>

Squiggle functions have their arity (parameter count) checked. This means that
the function `fn(x, y) x + y` will throw an error if called with any number of
arguments besides **2**. This may not seem like a big deal if you're used to
JavaScript, but this behavior leads to errors traveling through your program to
later points, undetected, and makes refactoring code extremely hard, as changing
the arity of a function generally leads to misbehaving code rather than flat out
errors where the incorrect call occurs.

<h3 id="this"><a href="#this">No implicit this</a></h3>

The JavaScript keyword `this` is really a pain. Just look at all the [Stack
Overflow results][1]. It's such a common pain point that there's a pattern of
[var self = this][2] to work around it nesting and callback issues. It's also
hard to tell up front of a function uses `this` at all. You could even
accidentally use when copy/pasting code. Because of this, Squiggle makes
JavaScript's `this` into a named parameter like any other:

```squiggle
let lorenzo = {
    name: "Lorenzo",
    getName: fn(@this) this.name
}
in lorenzo.getName()
```

This also means that callbacks are safer:

```squiggle
let obj = {
    delay: 300,
    title: "Squiggle is Cool",
    showLater: fn(@this)
        setTimeout(fn() global.alert(this.title), this.delay)
}
```

<h3 id="variadic"><a href="#variadic">Explicit variadic parameters</a></h3>

Many JavaScript functions are variadic (can accept many different numbers of
arguments), but JavaScript makes it hard to write these functions, relying on
the `arguments` pseudo-array. Squiggle uses the ES6 rest notation for functions
like this: `def printf(format, ...args)`.

<h3 id="no-hoisting"><a href="#no-hoisting">No hoisting</a></h3>

JavaScript is filled with hoisting. This means you can use variables before
initialization, which leads to subtle bugs when reordering your code, or when
you accidentally try to use values in a circular fashion. In Squiggle it's an
error to use a variable before initialization, and impossible to reassign a
variable.

<h3 id="frozen"><a href="#frozen">Frozen array/object literals</a></h3>

ES5 introduced `Object.freeze`, a function which makes a JavaScript object
impossible to update with new values. However, JS never got a syntax for frozen
object literals. In Squiggle, all array and object literals are frozen by
default, making it easy to safely pass off your data to another function,
knowing it cannot be modified.

<h3 id="easy-updates"><a href="#easy-updates">Easy update operators</a></h3>

JS arrays have the awkward `.concat` method to put two arrays together, but have
no built-in operators or methods or functions for merging objects. Squiggle adds
`++` for array concatenation and `~` for object concatenation, allowing
programmers to easily compose data.

<h3 id="destructuring"><a href="#destructuring">Destructuring and pattern matching</a></h3>

Squiggle also offers destructuring assignment and pattern matching, making it
easy to grab nested properties from objects, import multiple values into scope,
or dispatch behavior based on object shapes.

<h3 id="no-coercion"><a href="#no-coercion">No type coercion</a></h3>

Squiggle does not perform type coercion on its operators, so most of them only
work on numbers, producing runtime errors on other values. For example `1 + "2"`
is an error. Use `1.toString() ++ "2"`.

<h3 id="safe-dot"><a href="#safe-dot">Dot operator saftey</a></h3>

Squiggle throws errors on bad property access. For example, `foo.bar` will throw
unless `foo has "bar"` is true (meaning `foo` is not undefined/null, and has a
property "bar" with a value not equal to undefined). This makes it easier to
avoid grabbing nonexistent values from arrays and objects.

<h3 id="better-equality"><a href="#better-equality">Better equality</a></h3>

Squiggle has two separate equality operators: `is` and `==`. The operator `is`
is like the ES6 `Object.is`, and `==` is a deep equality check operator.

<h2 id="versus-cljs"><a href="#versus-cljs">Versus ClojureScript</a></h2>

ClojureScript is a very powerful and expressive language with a great community,
but it has some rough points compared to Squiggle.

Including libraries written in JS with your ClojureScript bundle is a bit
awkward. ClojureScript using Google Closure compiler wi.th advanced
optimizations on, meaning you have to
[actively fight against name mangling][3]
to use JS with your program.

ClojureScript uses `nil` (their version of `null`) pervasively to represent
values that cannot exist and other errors. The idea is that [nil
punning][9] will let `nil` flow through the system with the
desired behavior. Squiggle embraces [fail fast][4] design and throws as
many errors as possible, right at the site of the problem, for increased
debuggability of code.

The ["Quick Start" guide][5] is 11 printed pages and requires
installing Java and either downloading a JAR or adding a slow Java-based build
tool.

<h2 id="versus-elm"><a href="#versus-elm">Versus Elm</a></h2>

Elm is a very neat language, but it's really an entirely different world from
JS.

Elm code cannot call JS code, and vice versa. This means that to communicate,
everything is done through a message passing system with communication ports.
This means that gradually porting a JS application to Elm could be quite
difficult.

Elm has some great guarantees about statically enforced semver with its package
manager, but nonetheless requires a separate package manager and build tool from
existing JS tools.

Elm uses a Haskell-style import system, which encourages polluting your local scope like:

```haskell
import Html exposing (..)
import Style exposing (..)

type alias Styles = List ( String, String )

centeredLayout : Styles
centeredLayout =
  [ display flex'
  , justifyContent center
  , alignItems center
  ]

view : Html
view =
  div [ style centeredLayout ] [ text "Hello, world!" ]
```

So it's not clear by looking at import statements where a particular function is
even coming from.

<h2 id="versus-purescript"><a href="#versus-purescript">Versus PureScript</a></h2>

PureScript is fairly similar to Elm, though it does actually provide a way to
call JS code from PS and vice versa. Although, it mentions that code guarantees
can be violated this way.

Also, PureScript requires manual wrapping of JS functions to make them curried,
and JS must manually apply PS functions in a curried fashion. So for each JS
file you want to use with PS, you have to write out type annotations and curried
wrappers around all of its behavior, a non-trivial task.

<h2 id="versus-coffeescript"><a href="#versus-coffeescript">Versus CoffeeScript</a></h2>

CoffeeScript made a huge impact on the JS world, influencing multiple new
features in ES6. CoffeeScript aims to be expression-oriented and compile very
closely to JS, using the same tooling, much like Squiggle.

CoffeeScript contains **many** synonyms, making consistent code even harder to develop:

```coffeescript
yes     =    on    = true
no      =    off   = false
not     =    !
and     =    &&
or      =    ||
is      =    ===
isnt    =    !==
@       =    this
@foo    =    this.foo
```

Additionally, the flexible syntax can make programs parse in surprising ways:

This looks like a function that returns its only argument, but…

```coffeescript
f = x -> x

# looks like:
f = (x) -> x

# but works like:
f = x(() -> x)
```

This looks like a function that logs 4, but accidentally omitted whitespace
changes the meaning entirely, instead of producing an error.

```coffeescript
f = ->
console.log(4)

# looks like:
f = () ->
    console.log(4)

# works like:
f = () -> undefined
console.log(4)
```

CoffeeScript's syntax is at its most egregious with regards to functions passed
to other functions, or braceless based objects.

```coffeescript
foo ->
  console.log("yo")
,
  a: 1
  b: 2
  f: -> ->

# looks like... complete gibberish

# works like:
foo(() -> console.log("yo"), {
    a: 1,
    b: 2,
    f: () -> () -> undefined
})
```

Lastly, CoffeeScript does not provide any useful ways to compose arrays or
objects together, making its expression-oriented nature not as powerful as it
could be.

<h2 id="versus-es6"><a href="#versus-es6">Versus ES6 / ES2015</a></h2>

ES6 (now known as ES2015 officially) is the [latest JavaScript standard][7]. It
was designed to be backwards compatible, so that means it inherits all of
JavaScripts bad parts, merely adding *more things* to JS to know and use, not
reducing complexity in any way.

Browser support is getting better every day, but the [compatibility table][6] is
filled with a lot of red still. Many things cannot be polyfilled 100% correctly,
so there's also a risk of writing code that depends on polyfilled fake-ES6 but
won't run in a real ES6 engine, such as generators, symbols, weakmaps, and more.

<h2 id="versus-typescript"><a href="versus-typescript">Versus TypeScript</a></h2>

TypeScript is a superset of ES5 with support for some ES6 features, as well as a
static type system.

The type system is pretty good, especially for being optional and layered on top
of such a loose language, but it can provide very little assurance without
explicit type annotations on every single function argument, and many variable
declarations as well, meaning it's more work to gain value from TS. This also
means that using JS libraries with TypeScript nearly requires the use of
community maintained type definition files, of varying quality.

Also, per [TypeScript's design goals][8], it does not perform any runtime checks
on code. This is good for performance, but it makes TypeScript not terribly
useful for writing libraries, or for being used in a mixed JS/TS project, as the
type system is ignored in that case.

Otherwise, TypeScript essentially shares the same faults as plain JS or ES6.

[1]: http://stackoverflow.com/search?q=javascript+this
[2]: http://stackoverflow.com/questions/337878/var-self-this
[3]: http://lukevanderhart.com/2011/09/30/using-javascript-and-clojurescript.html
[4]: https://en.wikipedia.org/wiki/Fail-fast
[5]: https://github.com/clojure/clojurescript/wiki/Quick-Start
[6]: http://kangax.github.io/compat-table/es6/
[7]: http://www.ecma-international.org/ecma-262/6.0/
[8]: https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals
[9]: http://www.lispcast.com/nil-punning
