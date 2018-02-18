#! /usr/bin/env node

var glob = require("glob");
var minimist = require("minimist");
var inkscape = require("./inkscape");
var helpers = require("./helpers");

// parse arguments with minimist
var argv = minimist(process.argv);
var input = argv._.length>=3 ? argv._[2] : null;
var dpi = argv.dpi ? argv.dpi : null;
var exportType = argv.type ? argv.type : null;

if (input==null) {
    throw new Error("No input file(s) specified!");
}

glob(input, function(er, files) {
    // set DPI
    if (dpi!=null) {
        inkscape.setDPI(dpi);
    }
    // set export type
    if (exportType != null) {
        inkscape.setExportType(exportType);
    }
    // export files
    for (var i=0; i<files.length; i++) {
        var inputFile = files[i];
        var outputFile = helpers.removeFileExtension(inputFile);
        inkscape.export(inputFile, outputFile);
    }
});
