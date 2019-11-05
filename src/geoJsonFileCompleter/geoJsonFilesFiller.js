const colorprint = require('colorprint');
const coordsArrayToDirectionsArray = require('./coordsArrayToDirectionsArray');
const filesSearcher = require('../fileHandlers/filesSearcher');
const geoJsonFileUtils = require('../fileHandlers/geoJsonFileUtils');
const geoJsonObjectValidator = require('../geoJsonObjectUtils/geoJsonObjectValidator');
const settingsHandler = require('../settingsHandler/settingsHandler');

module.exports = async function geoJsonFilesFiller(geoJsonFilesFolder, loadAddresses) {

    let geoJsonFiles = filesSearcher(geoJsonFilesFolder, 'geojson');

    for (let fileIndex = 0; fileIndex < geoJsonFiles.length; fileIndex++) {
        
        let geoJsonFilePath = geoJsonFiles[fileIndex];
        
        const geoJsonObjectInput = typeof geoJsonFilePath === "string" ?
            geoJsonFileUtils.geoJsonFileReader(geoJsonFilePath) : geoJsonFilePath;

        if (geoJsonObjectValidator(geoJsonObjectInput)) {
            if (geoJsonObjectInput.gtfs) {
                colorprint.info(`Skipping file: ${geoJsonFilePath} since the file already has the addresses saved`);
            }
            else {
                let addresses;
                if (!settingsHandler.getSettings().geocoderOptions || !loadAddresses) {
                    if (!settingsHandler.getSettings().geocoderOptions) {
                        colorprint.error('Geocoder options have not been declared in settings file. S/N addresses will be used');
                    }
                    addresses = Array(geoJsonObjectInput.features[0].geometry.coordinates.length).fill('S/N');
                }
                else {
                    // ToDo:
                    // what if I have more than one geoLine?
                    // it should be validated for not more than one geoLine or
                    // we should handle all the lines
                    colorprint.info(`Getting addresses from file ${geoJsonFilePath}`);
                    addresses = await coordsArrayToDirectionsArray(geoJsonObjectInput.features[0].geometry.coordinates);
                }

                let gtfs = {
                    addressNames: addresses
                };
                geoJsonObjectInput.gtfs = gtfs; 
                geoJsonFileUtils.geoJsonFileWriter(geoJsonObjectInput, geoJsonFilePath);
            }
        }
        else {
            colorprint.error(`${geoJsonObjectInput} is an invalid geoJson file !!!`);
        }
    }   
}
