var fs = require('fs');
var pathModule = require('path');

module.exports = {

    removeFileExtension: function(file) {
        dotIndex = file.lastIndexOf(".");
        
        if (dotIndex>=0) {
            return file.substr(0, dotIndex);
        }

        return file;
    },

    isDirectory: function(path) {
        if (fs.existsSync(path)) {
            // path already exists
            var info = fs.statSync(path);
            if (info.isDirectory()) {
                return true;
            } else {
                return false;
            }
        } else {
            // path doesn't exist
            if (path.substr(-1)=="/" || path.substr(-1)=="\\") {
                return true;
            } else {
                return false;
            }
        }
    },
    
    concatPaths: function(a, b) {
        var result = null;
        if (a == "" || a == null) {
            result = b;
        } else {
            if (a.substr(-1) == "/" || a.substr(-1) == "\\") {
                result = a + b;
            } else {
                var tmp = a + b;
                // try to find path separator from input
                if (tmp.indexOf("/")>=0) {
                    result = a + "/" + b;
                } else if (tmp.indexOf("\\") >= 0) {
                    result = a + "\\" + b;
                } else {
                    // else get the system separator
                    result = a + pathModule.sep + b;
                }
            }
        }
        return result;
    }

}