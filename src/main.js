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
        
        fse.initializeEmptyFolder('./gtfs');
        // TO DO: after this i should create all the gtfs files (with only the headers), in order to only append rows after
        
        // Generating an Calendar.txt row
        let calendar = gtfsCalendarGenerator(generalSettings);
        let calendarRow = geoJsonObjectToCsv(calendar);
        fileWriter('./gtfs/calendar.csv', calendarRow);
        // TO DO: Generating frequencies.txt

        // TO DO:: forEach geoJson file in folder do:

        // TO DO:: generate directions array in the geoJson object/file
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
        
        // Generating an agency.txt row for each geoJson file
        let agency = gtfsAgencyGenerator.gtfsAgencyGenerator(input, generalSettings);
        let agencyCsvRow = geoJsonObjectToCsv(agency);
        fileWriter('./gtfs/agency.csv', agencyCsvRow);
        
        // Generating stops.txt rows for each geoJson file
        let stops = gtfsStopsObjectGenerator(input);
        let stopsRows = geoJsonObjectToCsv(stops);
        fileWriter('./gtfs/stops.csv', stopsRows);

        // TO DO: Generating Routes.txt row for each geoJson file
        // TO DO: Generating trips.txt row for each geoJson file
        // TO DO: Generating stop_times.txt rows for each geoJson file
    }
    else {
        console.log("invalid geoJson file !!!");
    }
}

main();
