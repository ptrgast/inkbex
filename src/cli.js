#! /usr/bin/env node

var minimist = require("minimist");
var inkscape = require("./inkscape");

// parse arguments with minimist
var argv = minimist(process.argv);
var input = argv._.length>=3 ? argv._[2] : null;
var dpi = argv.dpi ? argv.dpi : null;
var exportType = argv.type ? argv.type : null;

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

inkscape.globExport(input);
