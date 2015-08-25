---
title: "Language overview"
layout: chapter
section: 2
subsection: 3
---

Squiggle does not invent its own world separate from JavaScript, Node.js, npm,
and friends. It is meant to be used within the existing JavaScript ecosystem,
calling JavaScript code, and being called from JavaScript.

The compiler transforms Squiggle files into JavaScript files, on a per-file
basis. You can then handle these JavaScript files just like you would hand-
written ones. Bundle them, `require` them, minify them, gzip them, whatever you
want.
