---
---

(function() {
    function nest(hs) {
        if (hs.length === 0) {
            return [];
        }

        if (hs.length === 1) {
            return [{
                level: getLevel(hs[0]),
                element: hs[0],
                children: []
            }]
        }

        var h = hs[0];
        var hh = hs.slice(1);
        var xs = partition(function(x) {
            return getLevel(x) === getLevel(h);
        }, hh);
        var ret = {
            level: getLevel(h),
            element: h,
            children: nest(xs[0])
        };
        return [ret].concat(nest(xs[1]));
    }

    function partition(f, xs) {
        var i = 0;
        var n = xs.length;
        while (i < n && !f(xs[i])) {
            i++;
        }
        return [xs.slice(0, i), xs.slice(i)];
    }

    function elementText(e) {
        return e.textContent || e.innerText;
    }

    function getLevel(e) {
        if (e.nodeName === "H1") return 1;
        if (e.nodeName === "H2") return 2;
        if (e.nodeName === "H3") return 3;
        throw new Error("get on my level");
    }

    function render(h) {
        var e = document.createElement("ul");
        render_([], e, {children: h});
        return e;
    }

    function render_(level, e, h) {
        if (h.element) {
            e.appendChild(formatEntry(level, h.element));
        }
        if (h.children) {
            var container = document.createElement("ul");
            level = levelDescend(level);
            h.children.forEach(function(hh) {
                render_(level, container, hh);
                level = levelStep(level);
            });
            level = levelAscend(level);
            e.appendChild(container);
        }
    }

    function E(type, attrs, children) {
        attrs = attrs || {};
        children = children || [];
        var e = document.createElement(type);
        for (var k in attrs) {
            e.setAttribute(k, attrs[k]);
        }
        children.forEach(function(kid) {
            if (typeof kid === "string") {
                kid = document.createTextNode(kid);
            }
            e.appendChild(kid);
        });
        return e;
    }

    function formatEntry(level, h) {
        return E("li", null, [
            E("a", {href: "#" + h.id}, [
                level.join(".") + " " + elementText(h)
            ])
        ]);
    }

    function levelStep(l) {
        var init = levelAscend(l);
        var last = l[l.length - 1];
        return init.concat([last + 1]);
    }

    function levelDescend(l) {
        return l.concat([1]);
    }

    function levelAscend(l) {
        return l.slice(0, l.length - 1);
    }

    function setChild(e, kid) {
        e.innerHTML = "";
        e.appendChild(kid);
    }

    function $$(sel) {
        return toArray(document.querySelectorAll(sel));
    }

    function toArray(xs) {
        return [].slice.call(xs);
    }

    function toc(elem) {
        var headings = $$("h1, h2, h3");
        var nestedHeadings = nest(headings);
        // console.log("FLAT HEADINGS");
        // console.log(headings);
        console.log("NESTED HEADINGS");
        console.log(JSON.stringify(nestedHeadings, null, 2));
        var tocElem = render(nestedHeadings);
        // debugger;
        setChild(elem, tocElem);
    }

    this.toc = toc;
}.call(this));
