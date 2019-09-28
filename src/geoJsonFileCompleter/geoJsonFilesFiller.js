const filesSearcher = require('../fileHandlers/filesSearcher');
const geoJsonObjectValidator = require('../geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonFileUtils = require('../fileHandlers/geoJsonFileUtils');
const coordsArrayToDirectionsArray = require('./coordsArrayToDirectionsArray');

module.exports = async function geoJsonFilesFiller(geoJsonFilesFolder) {

    let geoJsonFiles = filesSearcher(geoJsonFilesFolder, 'geojson');

    for (let fileIndex = 0; fileIndex < geoJsonFiles.length; fileIndex++) {
        
        let geoJsonFilePath = geoJsonFiles[fileIndex];
        
        const geoJsonObjectInput = typeof geoJsonFilePath === "string" ?
            geoJsonFileUtils.geoJsonFileReader(geoJsonFilePath) : geoJsonFilePath;

        if (geoJsonObjectValidator(geoJsonObjectInput)) {
            if (geoJsonObjectInput.gtfs) {
                console.log(`Skipping file: ${geoJsonFilePath}`);
            }
            else {
                // ToDo:
                // what if I have more than one geoLine?
                // it should be validated for not more than one geoLine or
                // we should handle all the lines
                console.log(`Getting addresses from file ${geoJsonFilePath}`);
                let addresses = await coordsArrayToDirectionsArray(geoJsonObjectInput.features[0].geometry.coordinates);
                let gtfs = {
                    addressNames: addresses
                };
    
                geoJsonObjectInput.gtfs = gtfs; 
                geoJsonFileUtils.geoJsonFileWriter(geoJsonObjectInput, geoJsonFilePath);
            }
        }
        else {
            console.log(`${geoJsonObjectInput} is an invalid geoJson file !!!`);
        }
    }   
}
