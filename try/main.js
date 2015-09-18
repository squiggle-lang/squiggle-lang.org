"use strict";

var CM = global.CodeMirror;
var S = require("squiggle");
var debounce = require("lodash/function/debounce");

var squiggleCodeOpts = {
    lineWrapping: true,
    lineNumbers: true,
    mode: "text/plain",
    theme: "material",
};

var javascriptCodeOpts = {
    lineWrapping: true,
    lineNumbers: true,
    readOnly: true,
    mode: "application/javascript",
    theme: "material",
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
    var ret = S.parse(code);
    var ast;
    if (ret.status) {
        ast = ret.value;
    } else {
        replacementConsole.log(JSON.stringify(ret));
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

function loggerMaker(type) {
    return function() {
        var str = [].map.call(arguments, String).join(" ");
        var txtNode = document.createTextNode(str);
        var element = document.createElement("div");
        element.className = type;
        element.appendChild(txtNode);
        theConsole.appendChild(element);
        theConsole.scrollTop = theConsole.scrollHeight;
    };
}

var replacementConsole = {
    log: loggerMaker("log"),
    warn: loggerMaker("warn"),
    error: loggerMaker("error"),
    info: loggerMaker("info"),
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
editors.squiggle.setValue([
    "let m = global.Math",
    "let rand = m.random",
    "let floor = m.floor",
    "let log = console::log",
    "in log(floor(rand() * 100))"
].join("\n") + "\n")

editors.squiggle.setOption("extraKeys", {
  "Ctrl-Enter": run
});

sel("#run").onclick = run;
