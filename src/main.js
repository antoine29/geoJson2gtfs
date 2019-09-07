const geoJsonFileReader = require('./fileHandlers/geoJsonFileReader');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonToStopsFile = require('./geoJsonObjectToCsv/geoJsonToStopsFile');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');

let geoJsonFileName = './test/geoJsonTestFile.geojson';
const input = typeof geoJsonFileName === "string" ?
    geoJsonFileReader(geoJsonFileName) : geoJsonFileName;

const validationResult = geoJsonObjectValidator(input);

const stops = geoJsonToStopsFile(input);
console.log(stops);

let csv = geoJsonObjectToCsv(stops);
console.log(csv);

fileWriter('file.csv', csv);