const fs = require('fs');
const archiver = require('archiver');

// exports.compressFolder = function(path) {
exports.compressFolder = function(inFolderPath) {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream('./gtfs.zip');

    return new Promise((resolve, reject) => {
      archive
        .directory(inFolderPath, false)
        .on('error', err => reject(err))
        .pipe(stream)
      ;

      stream.on('close', () => resolve());
      archive.finalize();
    });
};