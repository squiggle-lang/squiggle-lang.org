"use strict";

var CM = global.CodeMirror;
var OopsyData = require("oopsy-data");
var S = require("squiggle-lang");
var fs = require("fs");
var uniq = require("lodash/array/uniq");
var debounce = require("lodash/function/debounce");
var assign = require("lodash/object/assign");

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
    mode: "text/x-squiggle"
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
        {embedSourceMaps: false}
    );
    if (!res.parsed) {
        var expectations =
            uniq(res.result.expected.slice().sort()).join(" ");
        var o = OopsyData.fromIndices(code, [res.result.index])[0];
        console.error(
            "Parse error at line " + o.line + ", column " + o.column + ":\n\n" +
            o.context + "\n\n" +
            "Expected one of: " + expectations
        );
        return "// error\n";
    }
    res.warnings.forEach(function(w) {
        console.warn(
            "Warning at line " + w.line + ", column " +
            w.column + ": " + w.data + "\n\n" +
            w.context
        );
    });
    return res.code;
}

function compileAndUpdate() {
    var squiggleCode = editors.squiggle.getValue();
    localStorage.squiggleCode = squiggleCode;
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

var examples = {
    Basic: fs.readFileSync('_examples/basic.sqg', 'utf8'),
    Factorial: fs.readFileSync('_examples/factorial.sqg', 'utf8'),
    "Hello world": fs.readFileSync('_examples/hello.sqg', 'utf8'),
    "HTTP server": fs.readFileSync('_examples/server.sqg', 'utf8'),
};

function E(name, attributes, children) {
    var e = document.createElement(name);
    assign(e, attributes);
    children.forEach(function(kid) {
        if (typeof kid === "string") {
            kid = document.createTextNode(kid);
        }
        e.appendChild(kid);
    });
    return e;
}

var options =
    Object.keys(examples).map(function(k) {
        var v = examples[k];
        return E("option", {value: v}, [k]);
    });

function addKids(e, kids) {
    kids.forEach(function(kid) {
        e.appendChild(kid);
    });
}

addKids(sel("#examples"), options);

function loadExample() {
    var select = sel("#examples");
    var opts = select.selectedOptions;
    if (opts.length === 0) {
        return;
    }
    var value = opts[0].value;
    editors.squiggle.setValue(value);
    select.selectedIndex = 0;
}

sel("#examples").onchange = loadExample;

var squiggleCode =
    localStorage.squiggleCode ||
    examples.Basic;

editors.squiggle.setValue(squiggleCode);
compileAndUpdate();
editors.squiggle.on("change", debounce(compileAndUpdate, 300));

editors.squiggle.setOption("extraKeys", {
  "Ctrl-Enter": run
});

sel("#run").onclick = run;
