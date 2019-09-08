const geoJsonFileReader = require('./fileHandlers/geoJsonFileReader');
const geoJsonFileWriter = require('./fileHandlers/geoJsonFileWriter');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonToStopsFile = require('./geoJsonObjectToCsv/geoJsonToStopsFile');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');
const coordsArrayToDirectionsArray = require('./geoJsonFileCompleter/coordsArrayToDirectionsArray');

async function main() {
    
    let geoJsonFileName = './src/geoJsonTestFile.geojson';

    const input = typeof geoJsonFileName === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    const validationResult = geoJsonObjectValidator(input);
    
    // let directions = await coordsArrayToDirectionsArray(input.features[0].geometry.coordinates);
    let directions = [
        "a1",
        "a2",
        "a3",
        "a4",
        "a5"
    ];

    let gtfsFields = {
        directions: directions
    };

    input.gtfs = gtfsFields;

    geoJsonFileWriter(input, geoJsonFileName);
    
    
    // const stops = geoJsonToStopsFile(input);
    // console.log(stops);
    
    // let csv = geoJsonObjectToCsv(stops);
    // console.log(csv);
    
    // fileWriter('file.csv', csv);
}

main();
