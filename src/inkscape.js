var shell = require("shelljs");

var Inkscape = function () {

    this._init = function () {
        var result = shell.exec("inkscape --version");
        if (result.code!=0) {
            throw new Error("Inkscape not found in your PATH!");
        }
    }

    this.export = function(input, output) {
        console.log("Exporting "+input+" to "+output);
    }

    this._init();

}

module.exports = new Inkscape();
