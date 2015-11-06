require 'rouge'

# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Squiggle < RegexLexer
      title "Squiggle"
      desc "A strict, functional, compile-to-JS language"

      tag 'squiggle'
      filenames '*.sqg'
      mimetypes 'text/x-squiggle'

      state :root do
        # comments
        rule(/#.*$/, Comment::Single)

        rule(/\s+/m, Text)

        rule(/[0-9][0-9_]*\.[0-9][0-9_]*/, Num::Float)
        rule(/[0-9][0-9_]*/, Num::Integer)
        rule(/\bInfinity\b/, Num)
        rule(/\bNaN\b/, Num)

        rule(/\b(?:export|try|throw|error|fn|if|then|else|match|case|end|let|def|in|await|require)\b/, Keyword)

        rule(/"(?:\\\\|\\"|[^"])*"/, Str)

        rule(/\b(?:true|false|undefined|null|global)\b/, Name::Constant)

        rule(/(?:\+\+|~|\+|-|\*|\/|=>|<=|>=|>|<|==|!=|=)/, Operator)
        rule(/\b(?:and|or|is|not|has)\b/, Operator)

        rule(/[,\.:{}\[\]()@]+/, Punctuation)

        rule(/[a-zA-Z_][a-zA-Z0-9_]*/, Name::Variable)
      end
    end
  end
end
