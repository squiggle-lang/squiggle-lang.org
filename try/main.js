"use strict";

var CM = global.CodeMirror;
var S = require("squiggle");
var debounce = require("lodash/function/debounce");

function loggerMaker(type) {
    var old = console[type];
    console["_" + type] = old;
    console[type] = function() {
        old.apply(console, arguments);
        var str = [].map.call(arguments, String).join(" ");
        var txtNode = document.createTextNode(str);
        var element = document.createElement("div");
        element.className = type;
        element.appendChild(txtNode);
        theConsole.appendChild(element);
        theConsole.scrollTop = theConsole.scrollHeight;
    };
}

loggerMaker("log");
loggerMaker("warn");
loggerMaker("error");
loggerMaker("info");

var squiggleCodeOpts = {
    lineWrapping: false,
    lineNumbers: true,
    mode: "text/plain"
};

var javascriptCodeOpts = {
    lineWrapping: false,
    lineNumbers: true,
    readOnly: true,
    mode: "application/javascript"
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
    var res = S.compile(
        code,
        "example.squiggle",
        "example.js",
        "example.js.map"
    );
    if (!res.parsed) {
        console.log("Parse fail:", res);
        return "// error\n";
    }
    res.warnings.forEach(function(warning) {
        // TODO: Format the warning correctly
        console.log(
            "line " + warning.line +
            ", column " + warning.column +
            ": " + warning.message
        );
    });
    return res.code;
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

function run() {
    clearConsole();
    setTimeout(function() {
        var code = editors.javascript.getValue();
        var js = "return " + code;
        try {
            Function(js)();
        } catch (e) {
            console.log(e);
        }
    }, 100);
}

compileAndUpdate();
editors.squiggle.on("change", debounce(compileAndUpdate, 300));
editors.squiggle.setValue([
    "let console = global.console",
    "let x = 1",
    "def inc(x) = x + 1",
    "in console.log(inc(x))",
].join("\n") + "\n")

editors.squiggle.setOption("extraKeys", {
  "Ctrl-Enter": run
});

sel("#run").onclick = run;

function $$(selector) {
    return [].slice.call(document.querySelectorAll(selector));
}

function resizeCodeAreas() {
    $$(".CodeMirror").forEach(function(element) {
        var vh = document.documentElement.clientHeight;
        var h = Math.max(300, vh - 400);
        element.style.height = h + "px";
    })
}

resizeCodeAreas();
window.onresize = resizeCodeAreas;

