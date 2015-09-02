'use strict';

var http = require('http');
var finalhandler = require('finalhandler');
var chalk = require('chalk');
var extname = require('path').extname;
var fs = require('fs');
var ecstatic = require('ecstatic');

var server = http.createServer(function (req, res) {
    // Gracefully handle files that are not found
    var done = finalhandler(req, res);
    // Handle serving static files through ecstatic
    ecstatic({root: __dirname + '/build', handleError: false})(req, res, done);
});

server.listen(6500);
console.log(chalk.green('started'), 'http://localhost:6500');
