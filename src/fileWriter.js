const fs = require('fs');

module.exports = function fileWriter(fileName, file) {
    fileName = './' + fileName;
    
    let writeStream = fs.createWriteStream(fileName);
    
    writeStream.write(file, err => {
        if(err) {
            console.log(`Error trying to write file ${fileName}`);
        }
    });
    
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    
    writeStream.end();
}