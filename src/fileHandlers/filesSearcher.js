const fg = require('fast-glob');
 
module.exports = function filesSearcher(folderPath, extension) {
    try {
        const entries = fg.sync([`${folderPath}/*.${extension}`], { dot: false, onlyFiles: true});
        return entries;
    } 
    catch (error) {
        throw `Error trying to list files with extension ${extension} in folder ${folderPath}`;
    }
}
