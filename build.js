var path = require('path'),
    fs = require('fs'),
    midas = require('midas'),
    Metalsmith = require('metalsmith'),
    svgo = require('metalsmith-svgo'),
    inplace = require('metalsmith-in-place'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates');

var renderer = new (require('marked')).Renderer();

renderer.code = function (code, lang) {
    if (lang === 'css') {
        return midas(code).content;
    }
    return '<pre><code class="lang-' + lang + '">' +
                require('highlight.js').highlightAuto(code).value +
            '</code></pre>';
}

Metalsmith(__dirname)
    .use(inplace({
        engine: 'handlebars',
        partials: 'partials'
    }))
    .use(svgo())
    .use(markdown({renderer: renderer}))
    .use(templates('handlebars'))
    .build(function (err) {
        if (err) { throw err; }
    });
