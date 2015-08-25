module TableOfContents
    class Generator < Jekyll::Generator
        SEC_REGEXP = %r{/ch/(\d+)\.(\d+)}

        def generate(site)
            pairs = site
                .pages
                .select {|page| page.name == "index.md" }
                .map {|page| [page, page.dir.match(SEC_REGEXP)] }
                .select {|pair| pair[1] }
                .map {|pair|
                    page, match = pair
                    chapter = match[1..-1].map(&:to_i)
                    toc_data = {
                        "title" => page.data["title"],
                        "section" => chapter[0],
                        "subsection" => chapter[1],
                        "chapter" => chapter,
                    }
                    [page, toc_data]
                }
                .sort_by {|pair| pair[1]["chapter"] }
            toc = pairs.map{|p| p[1] }
            site
                .pages
                .select {|p| p.dir == "/tutorial" && p.basename == "index" }
                .each {|p| p.data["toc"] = toc }
            pairs.each {|pair|
                page, n = pair
                section = n["section"]
                subsection = n["subsection"]
                i = toc.index(n)
                n_prev = _chapter_plus_n(toc, i, -1)
                n_next = _chapter_plus_n(toc, i, +1)
                d = page.data
                d["section"] = section
                d["subsection"] = subsection
                d["next"] = n_next
                d["previous"] = n_prev
            }
        end

        def _chapter_plus_n(toc, i, n)
            return nil if i == nil
            j = i + n
            return nil if j < 0 || j >= toc.length
            toc[j]["chapter"].join(".")
        end
    end
end
