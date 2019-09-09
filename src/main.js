const geoJsonFileReader = require('./fileHandlers/geoJsonFileReader');
const geoJsonFileWriter = require('./fileHandlers/geoJsonFileWriter');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');
const coordsArrayToDirectionsArray = require('./geoJsonFileCompleter/coordsArrayToDirectionsArray');
const fse = require('./fileHandlers/fs-extraUtils');

const gtfsAgencyGenerator = require('./gtfsEntitiesGenerators/agencyGenerator/gtfsAgencyGenerator');
const gtfsCalendarGenerator = require('./gtfsEntitiesGenerators/calendarObjectGenerator/gtfsCalendarObjectGenerator');
const gtfsStopsObjectGenerator = require('./gtfsEntitiesGenerators/stopsObjectGenerator/gtfsStopsObjectGenerator');

async function main() {
    
    let geoJsonFileName = './src/geoJsonTestFile.geojson';
    
    const input = typeof geoJsonFileName === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    
    if (geoJsonObjectValidator(input)) {

        let generalSettings = {
            agencySettings: {
                agencyTimeZone: "America/Caracas" ,
                agencyUrl: "https://github.com/antoine29"
            },
            calendarSettings: {
                serviceId: "AllWeek", 
                startDate: "20120101",
                endDate: "20301212",
                serviceDays: [1,1,1,1,1,1,1]
            }
        };
        
        // initializing gtfs folder 
        fse.initializeEmptyFolder('./gtfs');
        // after this i should create all the gtfs files (with only the headers)
        // in order to only append rows after
        
        // Generating an Calendar.txt row
        let calendar = gtfsCalendarGenerator(generalSettings);
        let calendarRow = geoJsonObjectToCsv(calendar);
        fileWriter('./gtfs/calendar.csv', calendarRow);
        
        // forEach geoJson file in folder do:
        
        // Generating an Agency.txt row for each geoJson file
        let agency = gtfsAgencyGenerator.gtfsAgencyGenerator(input, generalSettings);
        let agencyCsvRow = geoJsonObjectToCsv(agency);
        fileWriter('./gtfs/agency.csv', agencyCsvRow);
        
        // Generating Stops.txt rows for each geoJson file
        let stops = gtfsStopsObjectGenerator(input);
        let stopsRows = geoJsonObjectToCsv(stops);
        fileWriter('./gtfs/stops.csv', stopsRows);

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
    }
    else {
        console.log("invalid geoJson file !!!");
    }
}

main();
