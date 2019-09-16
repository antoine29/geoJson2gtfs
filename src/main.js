const geoJsonFileUtils = require('./fileHandlers/geoJsonFileUtils');
const fileWriter = require('./fileHandlers/fileWriter');
const geoJsonObjectValidator = require('./geoJsonObjectUtils/geoJsonObjectValidator');
const geoJsonObjectToCsv = require('./geoJsonObjectToCsv/geoJsonObjectToCsv');
const fse = require('./fileHandlers/fs-extraUtils');
const filesSearcher = require('./fileHandlers/filesSearcher');

const geoJsonFilesFiller = require('./geoJsonFileCompleter/geoJsonFilesFiller');

const agencyObjectGenerator = require('./gtfsEntitiesGenerators/agencyObjectGenerator');
const calendarObjectGenerator = require('./gtfsEntitiesGenerators/calendarObjectGenerator');
const stopsObjectGenerator = require('./gtfsEntitiesGenerators/stopsObjectGenerator');

function getLocalSettings() {
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

    return generalSettings;
}

async function main(generalSettings) {

    let geoJsonFilesFolder = './geoJsonFiles/*.geojson' ;
    let gtfsFolderRoute = './gtfs/';
    let calendarFileName = 'calendar.txt';
    let agencyFileName = 'agency.txt';
    let stopsFileName = 'stops.txt';
    
    // filling the missing addresses in geoJson files
    await geoJsonFilesFiller(geoJsonFilesFolder);

    fse.initializeEmptyFolder(gtfsFolderRoute);

    // These rows only have to be writen once time at the begining of the program
    // Writing calendar.txt and its headers
    let calendarObjectFields = calendarObjectGenerator.calendarObjectFields();
    let gtfsCalendarHeadersRow = geoJsonObjectToCsv(calendarObjectFields, true);
    fileWriter(gtfsFolderRoute+calendarFileName, gtfsCalendarHeadersRow);
    // Writing agency.txt and its headers
    let agencyObjectFields = agencyObjectGenerator.agencyObjectFields();
    let gtfsAgencyHeadersRow = geoJsonObjectToCsv(agencyObjectFields, true);
    fileWriter(gtfsFolderRoute+agencyFileName, gtfsAgencyHeadersRow);
    // Writing stops.txt and its headers
    let stopsObjectFields = stopsObjectGenerator.stopsObjectFields();
    let gtfsStopsHeadersRow = geoJsonObjectToCsv(stopsObjectFields, true);
    fileWriter(gtfsFolderRoute+stopsFileName, gtfsStopsHeadersRow);
    
    // Writing the calendar.txt rows
    let calendarObjectValues = calendarObjectGenerator.calendarObjectGenerator(generalSettings);
    let gtfsCalendarRows = geoJsonObjectToCsv(calendarObjectValues, false);
    fileWriter(gtfsFolderRoute+calendarFileName, gtfsCalendarRows);
    
    // Getting all geojson files in directory
    let geoJsonFiles = filesSearcher(geoJsonFilesFolder);

    for (let fileIndex = 0; fileIndex < geoJsonFiles.length; fileIndex++) {
        
        let geoJsonFilePath = geoJsonFiles[fileIndex];
        
        const geoJsonObjectInput = typeof geoJsonFilePath === "string" ?
            geoJsonFileUtils.geoJsonFileReader(geoJsonFilePath) : geoJsonFilePath;

        if (geoJsonObjectValidator(geoJsonObjectInput)) {
            // Writing an agency.txt row for each geoJson file
            let agency = agencyObjectGenerator.agencyObjectGenerator(geoJsonObjectInput, generalSettings);
            let agencyCsvRow = geoJsonObjectToCsv(agency, false);
            fileWriter(gtfsFolderRoute+agencyFileName, agencyCsvRow);
            // Writing an stop.txt row for each geoJson file
            let stop = stopsObjectGenerator.stopsObjectGenerator(geoJsonObjectInput);
            let stopCsvRow = geoJsonObjectToCsv(stop, false);
            fileWriter(gtfsFolderRoute+stopsFileName, stopCsvRow);
        }
        else {
            console.log(`${geoJsonObjectInput} is an invalid geoJson file !!!`);
        }
    }

    // // TO DO: Generating stop_times.txt rows for each geoJson file
    // // TO DO: Generating routes.txt row for each geoJson file
    // // TO DO: Generating trips.txt row for each geoJson file
    // // TO DO: Generating frequencies.txt for each geoJson file
}

main(getLocalSettings());
