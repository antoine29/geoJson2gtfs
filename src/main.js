const geoJsonFileReader = require('./fileHandlers/geoJsonFileReader');
const geoJsonFileWriter = require('./fileHandlers/geoJsonFileWriter');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');
const coordsArrayToDirectionsArray = require('./geoJsonFileCompleter/coordsArrayToDirectionsArray');
const fse = require('./fileHandlers/fs-extraUtils');

const agencyObjectGenerator = require('./gtfsEntitiesGenerators/agencyGenerator/agencyObjectGenerator');
const calendarObjectGenerator = require('./gtfsEntitiesGenerators/calendarObjectGenerator/calendarObjectGenerator');
const gtfsStopsObjectGenerator = require('./gtfsEntitiesGenerators/stopsObjectGenerator/gtfsStopsObjectGenerator');

async function main() {
    
    let geoJsonFileName = './src/geoJsonTestFile.geojson';
    
    const input = typeof geoJsonFileName === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    
    if (geoJsonObjectValidator(input)) {

        // this will be a json file comming as parameter
        let generalSettings = {
            agencySettings: {
                agencyTimeZone: "America/Caracas" ,
                agencyUrl: "https://github.com/antoine29"
            },
            calendarSettings: [
                {
                    serviceId: "AllWeek", 
                    startDate: "20120101",
                    endDate: "20301212",
                    serviceDays: [1,1,1,1,1,1,1]
                },
                {
                    serviceId: "laborDays", 
                    startDate: "20120101",
                    endDate: "20301212",
                    serviceDays: [1,1,1,1,1,0,0]
                }
            ]
        };
        
        let gtfsFolderRoute = './gtfs/';
        fse.initializeEmptyFolder(gtfsFolderRoute);

        // Writing calendar.txt and its headers
        let calendarObjectFields = calendarObjectGenerator.calendarObjectFields();
        let gtfsCalendarHeadersRow = geoJsonObjectToCsv(calendarObjectFields, true);
        fileWriter(gtfsFolderRoute+'calendar.txt', gtfsCalendarHeadersRow);
        // Writing agency.txt and its headers
        let agencyObjectFields = agencyObjectGenerator.agencyObjectFields();
        let gtfsAgencyHeadersRow = geoJsonObjectToCsv(agencyObjectFields, true);
        fileWriter(gtfsFolderRoute+'agency.txt', gtfsAgencyHeadersRow);

        // Generating the calendar.txt rows
        let calendarObjectValues = calendarObjectGenerator.calendarObjectGenerator(generalSettings);
        let gtfsCalendarRows = geoJsonObjectToCsv(calendarObjectValues, false);
        fileWriter(gtfsFolderRoute+'calendar.txt', gtfsCalendarRows);

        // // TO DO:: forEach geoJson file in folder do:

        // Generating an agency.txt row for each geoJson file
        // let agency = agencyObjectGenerator.agencyObjectGenerator(input, generalSettings);
        // let agencyCsvRow = geoJsonObjectToCsv(agency);
        // fileWriter('./gtfs/agency.csv', agencyCsvRow);

        // // TO DO:: generate directions array in the geoJson object/file
        // // make directions using the geoJson coords
        // // let directions = await coordsArrayToDirectionsArray(input.features[0].geometry.coordinates);
        // // let directions = [
        // //     "a1",
        // //     "a2",
        // //     "a3",
        // //     "a4",
        // //     "a5"
        // // ];
        
        // // let gtfsFields = {
        // //     directions: directions
        // // };
        
        // // adding the custom field in the original geoJson object
        // // input.gtfs = gtfsFields;
        
        // // writing (updating) the geoJson file
        // // geoJsonFileWriter(input, geoJsonFileName);
        
        
        // // Generating stops.txt rows for each geoJson file
        // let stops = gtfsStopsObjectGenerator(input);
        // let stopsRows = geoJsonObjectToCsv(stops);
        // fileWriter('./gtfs/stops.csv', stopsRows);

        // // TO DO: Generating routes.txt row for each geoJson file
        // // TO DO: Generating trips.txt row for each geoJson file
        // // TO DO: Generating frequencies.txt for each geoJson file
        // // TO DO: Generating stop_times.txt rows for each geoJson file
    }
    else {
        console.log("invalid geoJson file !!!");
    }
}

main();
