// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineSimpleMode("squiggle", {
  start:[
    {regex: /"(?:[^\\]|\\.)*?"/, token: "string"},
    {regex: /(?:[0-9][0-9_]*(\.[0-9_]+)?)/, token: "number"},
    {regex: /(?:export|try|throw|error|fn|if|then|else|elseif|match|case|let|def|do|end|in|await|require)\b/, token: "keyword"},
    {regex: /\b(?:true|false|null|undefined|global)\b/, token: "builtin"},
    {regex: /#.*/, token: "comment"},
    {regex: /(?:\+\+|~|\+|-|\*|\/|=>|<=|>=|>|<|==|!=|=|&)/, token: "operator"},
    {regex: /\b(?:has|is|not|and|or)\b/, token: "operator"},
    {regex: /[a-zA-Z_][a-zA-Z0-9]*/, token: "variable"},
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true}
  ],
  meta: {
    dontIndentStates: [],
    electricInput: /^\s*\}$/,
    lineComment: "#",
    fold: "brace"
  }
});


CodeMirror.defineMIME("text/x-squiggle", "squiggle");
});
