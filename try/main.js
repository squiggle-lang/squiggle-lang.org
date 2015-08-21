(function(global) {
    "use strict";

    var CM = global.CodeMirror;

    function sel(sel) {
        return document.querySelector(sel);
    }

    console.log("Hello try");

    var editors = {
        squiggle: CM.fromTextArea(sel("#squiggle-code")),
        javascript: CM.fromTextArea(sel("#javascript-code")),
    };

    function compile(code) {
        code = "// " + code.replace(/\n/g, "\n// ") + "\n";
        return code + "console.log(Math.random());\n";
    }

    function compileAndUpdate() {
        var squiggleCode = editors.squiggle.getValue();
        var js = compile(squiggleCode);
        editors.javascript.setValue(js);
    }

    var theConsole = sel("#console");

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
        runWithReplacedConsole(javascriptCode);
    }

    compileAndUpdate();
    editors.squiggle.on("change", compileAndUpdate);

    editors.squiggle.setOption("extraKeys", {
      "Ctrl-Enter": run
    });

    sel("#run").onclick = run;

    global.S = editors.squiggle;
}(this));
