const fse = require('fs-extra');

exports.initializeEmptyFolder = function (folderName) {
    // empties the folder, dont delete the folder itself just the content 
    // if the folder doesn't exists, its created
    try {
        fse.emptyDirSync(folderName);
        // fse.emptyDirSync('./gtfs');        
        console.log(`${folderName} folder was created`);
    } 
    catch (error) {
        console.log(`Error creating initialazing folder ${folderName}`);
        throw `Error creating initialazing folder ${folderName}`;
    }
}

exports.fileExists = function (path) {
    return true;
}
