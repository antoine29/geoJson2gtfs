const fse = require('fs-extra');

exports.initializeEmptyFolder = function(folderPath) {
    // empties the folder, dont delete the folder itself just the content 
    // if the folder doesn't exists, its created
    try {
        fse.emptyDirSync(folderPath);
        console.log(`${folderPath} folder was created`);
    } 
    catch (error) {
        console.log(`Error creating initialazing folder ${folderPath}`);
        throw `Error creating initialazing folder ${folderPath}`;
    }
}
