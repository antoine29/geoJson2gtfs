const geoJsonFileReader = require('./fileHandlers/geoJsonFileReader');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonToStopsFile = require('./geoJsonObjectToCsv/geoJsonToStopsFile');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');
const coordsArrayToDirectionsArray = require('./geoJsonFileCompleter/coordsArrayToDirectionsArray');

async function main() {
    
    let geoJsonFileName = './test/fileHandlers_tests/geoJsonTestFile.geojson';

    const input = typeof geoJsonFileName === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    const validationResult = geoJsonObjectValidator(input);

    let gtfsFields = {
        directions: [
            "a1",
            "a2",
            "a3",
            "a4",
            "a5"
        ]
    };

    input.gtfs = gtfsFields;

    console.log(input);

    geoJsonFileWriter(input, geoJsonFileName);
    
    // let directions = await coordsArrayToDirectionsArray(input.features[0].geometry.coordinates);
    // console.log(directions);
    
    // const stops = geoJsonToStopsFile(input);
    // console.log(stops);
    
    // let csv = geoJsonObjectToCsv(stops);
    // console.log(csv);
    
    // fileWriter('file.csv', csv);
}

main();
