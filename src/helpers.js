module.exports = {

    removeFileExtension: function(file) {
        dotIndex = file.lastIndexOf(".");
        
        if (dotIndex>=0) {
            return file.substr(0, dotIndex);
        }

        return file;
    }

}