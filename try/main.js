"use strict";

var CM = global.CodeMirror;
var S = require("squiggle");
var debounce = require("lodash/function/debounce");

function sel(sel) {
    return document.querySelector(sel);
}

var editors = {
    squiggle: CM.fromTextArea(sel("#squiggle-code")),
    javascript: CM.fromTextArea(sel("#javascript-code")),
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
    editors.javascript.setValue(js);
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
    var javascriptCode = editors.javascript.getValue();
    try {
        runWithReplacedConsole(javascriptCode);
    } catch (e) {
        replacementConsole.log(e);
    }
}

compileAndUpdate();
editors.squiggle.on("change", debounce(compileAndUpdate, 300));

editors.squiggle.setOption("extraKeys", {
  "Ctrl-Enter": run
});

sel("#run").onclick = run;
