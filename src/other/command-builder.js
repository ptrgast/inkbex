module.exports = function() {

    this._command = null;
    this._options = [];

    // set the command name
    this.setCommand = function(command) {
        this._command = command;
    }

    // add or update an option
    this.setOption = function(param, value) {
        var option = this._findOption(param);       

        if (option == null) {
            // Add option
            option = {
                param: param,
                value: value
            };
            this._options.push(option);
        } else {
            // Update option
            option.param = param;
            option.value = value;
        }
    }

    // get the value of an option
    this.getOption = function(param, defaultValue) {
        var option = this._findOption(param);
        if (option!=null) {
            return option.value;
        } else {
            return defaultValue;
        } 
    }

    // remove option
    this.clearOption = function(param) {
        for (var i = 0; i < this._options.length; i++) {
            var option = this._options[i];
            if (option.param == param) {
                this._options.splice(i, 1);
            }
        }      
    }

    // check if option exists
    this.hasOption = function(param) {
        var option = this._findOption(param);
        return option==null ? false : true;
    }

    this._findOption = function(param) {
        for (var i = 0; i < this._options.length; i++) {
            var option = this._options[i];
            if (option.param == param) {
                return option;
            }
        }

        return null;
    }

    // compose the command
    this.build = function() {
        var output = this._command;
        
        for (var i=0; i<this._options.length; i++) {
            var option = this._options[i];
            output += " " + option.param;
            if (option.value!=null) {
                output += " " + option.value;
            }
        }

        return output;
    }

}