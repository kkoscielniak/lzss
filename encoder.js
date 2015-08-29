var parse = require('./parse');

var encode = function (fileContent, dictionary, bufferLength, dictionaryLength) {
    
    var buffer = '',
        output = '',
        pos = 0,
        offset = 0;
        
    while (pos < fileContent.length) {
        var bufferEnd = pos + bufferLength <= fileContent.length ? bufferLength : fileContent.length - pos;
        
        buffer = fileContent.substr(pos, bufferEnd);
        
        if (buffer.length < 4) {
            buffer += '\0'.repeat(bufferLength - buffer.length);
        }
        
        if (pos > 0) {
            dictionary = dictionary.substr(offset) + fileContent.substr(pos - offset, offset);
        }
        
        if (dictionary.indexOf(buffer[0]) < 0) {
            output += '1' + buffer[0] + ' ';
            offset = 1;
        } else {
            var matchCount = 1;
            
            while (matchCount < bufferLength && dictionary.indexOf(buffer.substr(0, matchCount + 1)) > -1) {
                matchCount++;
            }
            
            var os = dictionaryLength - dictionary.lastIndexOf(buffer.substr(0, matchCount));

            output += "0" + os + matchCount + ' ';
            offset = matchCount;
        }
            
        pos += offset;
    }
    
    return output;
};
module.exports.encode = encode;

var decode = function(encoded, dictionary) {
    
    var output = '',
        pos = 0, 
        offset = 0, 
        matchCount = 0;
        
    while (pos < encoded.length) {
        if (encoded[pos] == '0') {
            matchCount = parse.IntTryParse(encoded[pos+2].toString());
            offset = parse.IntTryParse(encoded[pos+1].toString());
            
            output += dictionary.substr(dictionary.length - offset, matchCount);
            dictionary = dictionary.substr(matchCount) + output.substr(output.length - matchCount, matchCount);
            pos += 3;
        } else if (encoded[pos] == '1') {
            output += encoded[pos+1];
            dictionary = dictionary.substr(1) + output.slice(-1);
            pos += 2;
        } else {
            pos++;
        }
    }
    
    return output;
};
module.exports.decode = decode;