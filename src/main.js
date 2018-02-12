#! /usr/bin/env node

var glob = require("glob");
var inkscape = require("./inkscape");

glob(process.argv[process.argv.length-1], function(er, files) {
    for (var i=0; i<files.length; i++) {
        var inputFile = files[i];
        var outputFile = inputFile+".png";
        inkscape.export(inputFile, outputFile);
    }
});
