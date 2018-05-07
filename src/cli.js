#! /usr/bin/env node

var minimist = require("minimist");
var glob = require("glob");
var inkscape = require("./inkscape");
var helpers = require("./other/helpers");

// parse arguments with minimist
var argv = minimist(process.argv);
var input = argv._.length>=3 ? argv._[2] : null;
var dpi = argv.dpi ? argv.dpi : null;
var exportType = argv.type ? argv.type : null;
var exportArea = argv.area ? argv.area : null;

if (input==null) {
    throw new Error("No input file(s) specified!");
}

// set DPI
if (dpi!=null) {
    inkscape.setDPI(dpi);
}

// set export type
if (exportType != null) {
    inkscape.setExportType(exportType);
}

// set export area
if (exportArea != null) {
    inkscape.setExportArea(exportArea);
}
        
// export files
var inputFiles = glob.sync(input);
for (var i = 0; i < inputFiles.length; i++) {
    var inputFile = inputFiles[i];
    var outputFile = helpers.removeFileExtension(inputFile);
    inkscape.export(inputFile);
}
