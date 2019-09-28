const fs = require('fs');

module.exports = function streamFileWriter(filePath, file) {
    filePath = './' + filePath;
    
    let writeStream = fs.createWriteStream(
        filePath,
        {flags:'a'}
    );
    
    writeStream.write(file+'\n', err => {
        if(err) {
            console.log(`Error trying to write file ${filePath}`);
        }
    });
    
    writeStream.on('finish', () => {
        console.log(`writing to ${filePath} is done`);
    });
    
    writeStream.end();
}