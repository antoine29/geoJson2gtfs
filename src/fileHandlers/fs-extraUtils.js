const fse = require('fs-extra');
const colorprint = require('colorprint');

exports.initializeEmptyFolder = function(folderPath) {
    // empties the folder, dont delete the folder itself just the content 
    // if the folder doesn't exists, its created
    try {
        fse.emptyDirSync(folderPath);
    } 
    catch (error) {
        colorprint.fatal(`Error creating or initialazing folder ${folderPath}`);
        throw `Error creating initialazing folder ${folderPath}`;
    }
}
