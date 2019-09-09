const geoJsonFileReader = require('./fileHandlers/geoJsonFileReader');
const geoJsonFileWriter = require('./fileHandlers/geoJsonFileWriter');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonToStopsFile = require('./geoJsonObjectToCsv/geoJsonToStopsFile');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');
const coordsArrayToDirectionsArray = require('./geoJsonFileCompleter/coordsArrayToDirectionsArray');

// fs-extra utils
const fse = require('./fileHandlers/fs-extraUtils');
// gtfs generators
const gtfsAgencyGenerator = require('./gtfsEntitiesGenerators/agencyGenerator/gtfsAgencyGenerator');

async function main() {
    
    let geoJsonFileName = './src/geoJsonTestFile.geojson';
    
    const input = typeof geoJsonFileName === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    
    if (geoJsonObjectValidator(input)) {

        let generalSettings = {
            agencySettings: {
                agencyTimeZone: "America/Caracas" ,
                agencyUrl: "https://github.com/antoine29"
            }
        };

        // initializing gtfs folder 
        fse.initializeEmptyFolder('./gtfs');
        // forEach geoJson file in folder do:

        // Generating an Agency.txt row
        let agency = gtfsAgencyGenerator(input, generalSettings);
        let agencyCsvRow = geoJsonObjectToCsv(agency);
        fileWriter('./gtfs/agency.csv', agencyCsvRow);
        
        // make directions using the geoJson coords
        // let directions = await coordsArrayToDirectionsArray(input.features[0].geometry.coordinates);
        // let directions = [
        //     "a1",
        //     "a2",
        //     "a3",
        //     "a4",
        //     "a5"
        // ];
        
        // let gtfsFields = {
        //     directions: directions
        // };
        
        // adding the custom field in the original geoJson object
        // input.gtfs = gtfsFields;
        
        // writing (updating) the geoJson file
        // geoJsonFileWriter(input, geoJsonFileName);
        
        // Writing a stops file
        // const stops = geoJsonToStopsFile(input);
        // console.log(stops);
        
        // let csv = geoJsonObjectToCsv(stops);
        // console.log(csv);
        
        // fileWriter('file.csv', csv);
        
    }
    else {
        console.log("invalid geoJson file !!!");
    }
}

main();
