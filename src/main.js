#! /usr/bin/env node

var glob = require("glob");
var inkscape = require("./inkscape");
var helpers = require("./helpers");

glob(process.argv[process.argv.length-1], function(er, files) {
    for (var i=0; i<files.length; i++) {
        var inputFile = files[i];
        var outputFile = helpers.removeFileExtension(inputFile)+".png";
        inkscape.export(inputFile, outputFile);
    }
});
