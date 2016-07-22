var path = require('path'),
    fs = require('fs'),
    midas = require('midas'),
    Metalsmith = require('metalsmith'),
    remark = require('metalsmith-remark'),
    svgo = require('metalsmith-svgo'),
    inplace = require('metalsmith-in-place'),
    templates = require('metalsmith-templates');

Metalsmith(__dirname)
    .use(inplace({
        engine: 'handlebars',
        partials: 'partials'
    }))
    .use(svgo())
    .use(remark([
        require('remark-highlight.js'),
        require('remark-midas'),
        require('remark-slug')
    ]))
    .use(templates('handlebars'))
    .build(function (err) {
        if (err) { throw err; }
    });
