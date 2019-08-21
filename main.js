const geoJsonFileReader = require('./src/geoJsonFileReader');
const geoJsonObjectValidator = require('./src/geoJsonObjectValidator');
const geoJsonToStopsFile = require('./src/geoJsonToStopsFile');
const geoJsonObjectToCsv = require('./src/geoJsonObjectToCsv');
const fileWriter = require('./src/fileWriter');

let geoJsonFileName = './test/geoJsonTestFile.geojson';
const input = typeof geoJsonFileName === "string" ?
    geoJsonFileReader(geoJsonFileName) : geoJsonFileName;

const validationResult = geoJsonObjectValidator(input);

const stops = geoJsonToStopsFile(input);
console.log(stops);

let csv = geoJsonObjectToCsv(stops);
console.log(csv);

fileWriter('file.csv', csv);