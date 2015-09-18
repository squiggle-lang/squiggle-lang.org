module TableOfContents
    class Generator < Jekyll::Generator
        # Chapter files are stored in /tutorial/chapter/SEC.SUBSEC/index.md
        SEC_REGEXP = %r{/tutorial/chapter/(\d+)\.(\d+)}

        def generate(site)
            # Create pairs of page instances along with arrays like [x, y] where
            # the chapter of the page in that pair is "x.y".
            pairs = site
                .pages
                .select {|page| page.basename == "index" }
                .map {|page| [page, page.dir.match(SEC_REGEXP)] }
                .select {|pair| pair[1] }
                .map {|pair|
                    page, match = pair
                    chapter = [
                        match[1].to_i,
                        match[2].to_i,
                    ]
                    toc_data = {
                        "title" => page.data["title"],
                        "section" => chapter[0],
                        "subsection" => chapter[1],
                        "chapter" => chapter,
                    }
                    [page, toc_data]
                }
                .sort_by {|pair| pair[1]["chapter"] }

            # Grab just the [x, y] chapter arrays for use later.
            toc = pairs.map {|p| p[1] }

            # Find the page with the table of contents in it and inject the
            # chapters array as page data.
            site
                .pages
                .select {|p| p.dir == "/tutorial" && p.basename == "index" }
                .each {|p| p.data["toc"] = toc }

            # Inject various metadata used for chapters to render correctly.
            pairs.each {|pair|
                page, n = pair
                section = n["section"]
                subsection = n["subsection"]
                i = toc.index(n)
                n_prev = _chapter_plus_n(toc, i, -1)
                n_next = _chapter_plus_n(toc, i, +1)
                old_title = page.data["title"]
                new_title = format(
                    "%d.%d %s",
                    section,
                    subsection,
                    old_title
                )
                page.data.merge!({
                    "title" => new_title,
                    "layout" => "chapter",
                    "section" => section,
                    "subsection" => subsection,
                    "next" => n_next,
                    "previous" => n_prev,
                })
            }
        end

        # Tries to return the next/previous chapter or nil.
        def _chapter_plus_n(toc, i, n)
            return nil if i == nil
            j = i + n
            return nil if j < 0 || j >= toc.length
            toc[j]["chapter"].join(".")
        end
    end
end
