var commandExists = require('command-exists').sync;
var shell = require('shelljs');
var path = require('path');
var makeDir = require('make-dir');
var helpers = require('./other/helpers');
var CommandBuilder= require('./other/command-builder');

var Inkscape = function () {

    var _this = this;
    this._commandBuilder;

    this._init = function () {
        // Check that inkscape exists
        if (!commandExists("inkscape")) {
            throw new Error("Inkscape not found! Please add it to your PATH.");
        }

        // Create a new CommandBuilder
        this._commandBuilder = new CommandBuilder();
        this._commandBuilder.setCommand("inkscape");

        // Set defaults
        this.setExportType("png");
        this.setExportArea("page");
    }

    this.setDPI = function(dpi) {
        if (!Number.isInteger(dpi)) {
            throw new Error("DPI must be an integer!");
        }
        this._commandBuilder.setOption('-d', dpi);
    }

    /**
     * Set the export type (png or pdf)
     */ 
    this.setExportType = function(exportType) {
        var newExportType = null;
        if (exportType=="png") {
            this._commandBuilder.setOption('-e'); // png
            this._commandBuilder.clearOption('-A'); // pdf
            this._commandBuilder.clearOption('-T'); // text to path
        } else if (exportType=="pdf") {
            this._commandBuilder.setOption('-A'); // pdf
            this._commandBuilder.setOption('-T'); // text to path
            this._commandBuilder.clearOption('-e'); // png
        } else {
            throw new Error("Unsupported export type: "+exportType);
        }
    }

    /**
     * Set the exported area. Page, drawing or object ID
     */
    this.setExportArea = function(area) {
        if (area==null || area=="page") {
            this._commandBuilder.setOption('-C'); // page
            this._commandBuilder.clearOption('-D'); // drawing
            this._commandBuilder.clearOption('-i'); // id        
        } else if (area=="drawing") {
            this._commandBuilder.setOption('-D'); 
            this._commandBuilder.clearOption('-C');
            this._commandBuilder.clearOption('-i');        
        } else {
            this._commandBuilder.setOption('-i', area);
            this._commandBuilder.clearOption('-C');
            this._commandBuilder.clearOption('-D');
        }
    }

    this.export = function(input, output) {        
        // input
        this._commandBuilder.setOption('-f', input);
                
        // prepare output name
        var outputName = "";
        if (output==null) {
            outputName = helpers.removeFileExtension(input);
            if (this._commandBuilder.hasOption('-i')) { 
                // add object id to output name
                outputName += "-" + this._commandBuilder.getOption('-i', '');
            }
            outputName += this._getExtension();
        } else {
            if (helpers.isDirectory(output)) {
                outputName = helpers.concatPaths(output, helpers.removeFileExtension(input));
                outputName += this._getExtension();
                makeDir.sync(path.dirname(outputName)); // Create the path if needed
            } else {
                outputName = output;
            }
        }
            
        // set export type and output file
        if (this._commandBuilder.hasOption('-e')) { // png
            this._commandBuilder.setOption('-e', outputName);
        } else if (this._commandBuilder.hasOption('-A')) { // pdf
            this._commandBuilder.setOption('-A', outputName);
        }
        
        // execute
        console.log("Exporting " + input + " to " + outputName);
        var command = this._commandBuilder.build();
        // console.log(command);
        shell.exec(command, {silent:true});
    }

    this._getExtension = function() {
        if (this._commandBuilder.hasOption('-e')) { // png
            return ".png";
        } else if (this._commandBuilder.hasOption('-A')) { // pdf
            return ".pdf";
        }        
        return "";
    }

    this._init();

}

module.exports = new Inkscape();
