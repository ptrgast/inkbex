var shell = require("shelljs");

var Inkscape = function () {

    this._dpi = null;

    this._init = function () {
        var result = shell.exec("inkscape --version");
        if (result.code!=0) {
            throw new Error("Inkscape not found in your PATH!");
        }
    }

    this.setDPI = function(dpi) {
        this._dpi = dpi;
    }

    this.export = function(input, output) {
        console.log("Exporting "+input+" to "+output);
        
        // Create command
        var command = "inkscape -f "+input+" -e "+output;
        if (this._dpi!=null) {
            command += " -d "+this._dpi;
        }

        shell.exec(command, {silent:true});
    }

    this._init();

}

module.exports = new Inkscape();
