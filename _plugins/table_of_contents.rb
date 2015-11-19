module TableOfContents
    class Generator < Jekyll::Generator
        # Chapter files are stored in /tutorial/chapter/NUM/index.md
        SEC_REGEXP = %r{/tutorial/chapter/(\d+)}

        def generate(site)
            pairs = site
                .pages
                .select {|page| page.basename == "index" }
                .map {|page| [page, page.dir.match(SEC_REGEXP)] }
                .select {|pair| pair[1] }
                .map {|pair|
                    page, match = pair
                    chapter = match[1].to_i
                    toc_data = {
                        "title" => page.data["title"],
                        "chapter" => chapter,
                    }
                    [page, toc_data]
                }
                .sort_by {|pair| pair[1]["chapter"] }

            # Grab just the chapter array for use later.
            toc = pairs.map {|p| p[1] }

            # Find the page with the table of contents in it and inject the
            # chapters array as page data.
            site
                .pages
                .select {|p|
                    p.dir.start_with?("/tutorial") &&
                    p.basename == "index"
                }
                .each {|p| p.data["toc"] = toc }

            # Inject various metadata used for chapters to render correctly.
            pairs.each {|pair|
                page, n = pair
                i = toc.index(n)
                n_prev = _chapter_plus_n(toc, i, -1)
                n_next = _chapter_plus_n(toc, i, +1)
                chapter = toc[i]["chapter"]
                old_title = page.data["title"]
                new_title = format("%d %s", chapter, old_title)
                page.data.merge!({
                    "layout" => "chapter",
                    "title" => new_title,
                    "chapter" => chapter.to_s,
                    "next" => n_next,
                    "previous" => n_prev,
                })
            }
        end

        # Tries to return the next/previous chapter or nil.
        def _chapter_plus_n(toc, i, mod)
            return nil if i == nil
            j = i + mod
            return nil if j < 0 || j >= toc.length
            toc[j]["chapter"]
        end
    end
end
