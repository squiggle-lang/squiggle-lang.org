"use strict";

var CM = global.CodeMirror;
var S = require("squiggle");
var debounce = require("lodash/function/debounce");

var squiggleCodeOpts = {
    lineWrapping: true,
    lineNumbers: true,
    mode: "text/plain",
};

var javascriptCodeOpts = {
    lineWrapping: true,
    lineNumbers: true,
    readOnly: true,
    mode: "application/javascript",
};

function sel(sel) {
    return document.querySelector(sel);
}

var editors = {
    squiggle: CM.fromTextArea(sel("#squiggle-code"), squiggleCodeOpts),
    javascript: CM.fromTextArea(sel("#javascript-code"), javascriptCodeOpts),
};

function compile(code) {
    clearConsole();
    var ast;
    try {
        ast = S.parse(code);
    } catch (e) {
        replacementConsole.log(e.message);
        return "// error\n";
    }
    S.lint(ast).forEach(function(warning) {
        replacementConsole.log(warning);
    });
    var es = S.transformAst(ast);
    var js = S.compile(es);
    return js;
}

function compileAndUpdate() {
    var squiggleCode = editors.squiggle.getValue();
    var js = compile(squiggleCode);
    setJs(js);
}

function setJs(js) {
    editors.javascript.setValue(js);
    var info = editors.javascript.getScrollInfo();
    editors.javascript.scrollTo(0, info.height);
}

var theConsole = sel("#console");

function clearConsole() {
    theConsole.innerHTML = "";
}

var replacementConsole = {
    log: function() {
        var str = [].map.call(arguments, String).join(" ");
        var txtNode = document.createTextNode(str);
        var element = document.createElement("div");
        element.className = "log";
        element.appendChild(txtNode);
        theConsole.appendChild(element);
        theConsole.scrollTop = theConsole.scrollHeight;
    }
}

function runWithReplacedConsole(js) {
    Function("console", js)(replacementConsole);
}

function run() {
    clearConsole();
    setTimeout(function() {
        var javascriptCode = editors.javascript.getValue();
        try {
            runWithReplacedConsole(javascriptCode);
        } catch (e) {
            replacementConsole.log(e);
        }
    }, 100);
}

compileAndUpdate();
editors.squiggle.on("change", debounce(compileAndUpdate, 300));
editors.squiggle.setValue(
"let (\n" +
"    m = global.Math,\n" +
"    rand = m.random,\n" +
"    floor = m.floor,\n" +
"    log = console::log\n" +
") rand() * 100 |> floor |> log\n"
)

editors.squiggle.setOption("extraKeys", {
  "Ctrl-Enter": run
});

sel("#run").onclick = run;
