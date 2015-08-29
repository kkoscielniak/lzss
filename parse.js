var IntTryParse = function(str, defaultValue) {
    var retValue = defaultValue || 0;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
};
module.exports.IntTryParse = IntTryParse;