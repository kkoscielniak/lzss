String.prototype.repeat = function(times) {
   return (new Array(times + 1)).join(this);
};


Number.prototype.tryParse = function(str, defaultValue) {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
};
