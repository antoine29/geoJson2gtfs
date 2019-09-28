const fs = require('fs');

module.exports = function streamFileWriter(fileName, file) {
    fileName = './' + fileName;
    
    let writeStream = fs.createWriteStream(
        fileName,
        {flags:'a'}
    );
    
    writeStream.write(file+'\n', err => {
        if(err) {
            console.log(`Error trying to write file ${fileName}`);
        }
    });
    
    writeStream.on('finish', () => {
        console.log(`writing to ${fileName} is done`);
    });
    
    writeStream.end();
}