const fs = require('fs');
const colorprint = require('colorprint');
module.exports = function streamFileWriter(filePath, file) {
    filePath = './' + filePath;
    
    let writeStream = fs.createWriteStream(
        filePath,
        {flags:'a'}
    );
    
    writeStream.write(file+'\n', err => {
        if(err) {
            colorprint.fatal(`Error trying to write file ${filePath}`)
        }
    });
    
    writeStream.on('finish', () => {
    });
    
    writeStream.end();
}