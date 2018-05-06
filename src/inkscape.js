var shell = require("shelljs");
var glob = require("glob");
var helpers = require("./helpers");

var Inkscape = function () {

    var _this = this;

    this._dpi = null;

    this._exportTypes = [
        { name: "png", option: "-e", extension: "png" },
        { name: "pdf", option: "-T -A", extension: "pdf" }
    ];
    this._exportType = null;

    this._init = function () {
        // Check that inkscape exists
        var result = shell.exec("inkscape --version");
        if (result.code!=0) {
            throw new Error("Inkscape not found in your PATH!");
        }

        // Set default export type
        this.setExportType("png");
    }

    this.setDPI = function(dpi) {
        this._dpi = dpi;
    }

    this.setExportType = function(exportType) {
        var newExportType = null;
        for (var i=0; i<this._exportTypes.length; i++) {
            if (this._exportTypes[i].name==exportType) {
                newExportType = this._exportTypes[i];
            }
        }
        if (newExportType==null) {
            throw new Error("Unsupported export type: "+exportType);
        }
        this._exportType = newExportType;
    }

    this.export = function(input, output) {
        console.log("Exporting "+input+" to "+output+"."+this._exportType.extension);
        
        // Create command
        // input
        var command = "inkscape -f "+input;
        // output
        command += " "+this._exportType.option+" "+output+"."+this._exportType.extension;
        // dpi
        if (this._dpi!=null) {
            command += " -d "+this._dpi;
        }

        shell.exec(command, {silent:true});
    }

    this.globExport = function(inputGlob) {
        glob(inputGlob, function (er, files) {
            // export files
            for (var i = 0; i < files.length; i++) {
                var inputFile = files[i];
                var outputFile = helpers.removeFileExtension(inputFile);
                _this.export(inputFile, outputFile);
            }
        });
    }

    this._init();

}

module.exports = new Inkscape();
