require('./prototypes');

var fs = require('fs'),
    encoder = require('./encoder');

var fileContent,
    dictionary;
    
fileContent = fs.readFileSync('sam-i-am.txt').toString();

var bufferLength = 4,
    dictionaryLength = 8;
    
dictionary = fileContent[0].repeat(dictionaryLength);

var encodedFile = encoder.encode(fileContent, dictionary, bufferLength, dictionaryLength);
console.log(encodedFile);

var decodedFile = encoder.decode(encodedFile, dictionary);
console.log(decodedFile);