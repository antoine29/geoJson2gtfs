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
const routesObjectGenerator = require('./gtfsEntitiesGenerators/routesObjectGenerator');
const tripsObjectGenerator = require('./gtfsEntitiesGenerators/tripsObjectGenerator');

function getLocalSettings() {
    // this will be a json file comming as parameter
    let generalSettings = {
        agencySettings: {
            agencyTimeZone: "America/Caracas" ,
            agencyUrl: "https://github.com/antoine29"
        },
        calendarSettings: [
            {
                serviceId: "mon-sun", 
                startDate: "20120101",
                endDate: "20301212",
                serviceDays: [1,1,1,1,1,1,1]
            },
            {
                serviceId: "mon-fri", 
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
    let routesFileName = 'routes.txt';
    let tripsFileName = 'trips.txt';
    
    // filling the missing addresses in geoJson files
    await geoJsonFilesFiller(geoJsonFilesFolder);

    fse.initializeEmptyFolder(gtfsFolderRoute);

    // These rows only have to be writen once time at the begining of the program
    // Writing calendar.txt file and its headers
    let calendarObjectFields = calendarObjectGenerator.calendarObjectFields();
    let gtfsCalendarHeadersRow = geoJsonObjectToCsv(calendarObjectFields, true);
    fileWriter(gtfsFolderRoute+calendarFileName, gtfsCalendarHeadersRow);
    // Writing agency.txt file and its headers
    let agencyObjectFields = agencyObjectGenerator.agencyObjectFields();
    let gtfsAgencyHeadersRow = geoJsonObjectToCsv(agencyObjectFields, true);
    fileWriter(gtfsFolderRoute+agencyFileName, gtfsAgencyHeadersRow);
    // Writing stops.txt file and its headers
    let stopsObjectFields = stopsObjectGenerator.stopsObjectFields();
    let gtfsStopsHeadersRow = geoJsonObjectToCsv(stopsObjectFields, true);
    fileWriter(gtfsFolderRoute+stopsFileName, gtfsStopsHeadersRow);
    // Writing routes.txt file and its headers
    let routesObjectFields = routesObjectGenerator.routesObjectFields();
    let gtfsRoutesHeadersRow = geoJsonObjectToCsv(routesObjectFields, true);
    fileWriter(gtfsFolderRoute+routesFileName, gtfsRoutesHeadersRow);
    // Writing trips.txt file and its headers
    let tripsObjectFields = tripsObjectGenerator.tripsObjectFields();
    let gtfsTripsHeadersRow = geoJsonObjectToCsv(tripsObjectFields, true);
    fileWriter(gtfsFolderRoute+tripsFileName, gtfsTripsHeadersRow);
    
    // Writing the calendar.txt rows
    let calendarObjectValues = calendarObjectGenerator.calendarObjectGenerator(generalSettings);
    let gtfsCalendarRows = geoJsonObjectToCsv(calendarObjectValues, false);
    fileWriter(gtfsFolderRoute+calendarFileName, gtfsCalendarRows);
    
    // Getting all geojson files in directory
    let geoJsonFiles = filesSearcher(geoJsonFilesFolder);

    for (let geoJsonFileIndex = 0; geoJsonFileIndex < geoJsonFiles.length; geoJsonFileIndex++) {
        
        let geoJsonFilePath = geoJsonFiles[geoJsonFileIndex];
        
        const geoJsonObjectInput = typeof geoJsonFilePath === "string" ?
            geoJsonFileUtils.geoJsonFileReader(geoJsonFilePath) : geoJsonFilePath;

        if (geoJsonObjectValidator(geoJsonObjectInput)) {
            // Writing an agency.txt row for each geoJson file
            let agency = agencyObjectGenerator.agencyObjectGenerator(geoJsonObjectInput, generalSettings, geoJsonFileIndex);
            let agencyCsvRow = geoJsonObjectToCsv(agency, false);
            fileWriter(gtfsFolderRoute+agencyFileName, agencyCsvRow);
            // Writing stop.txt rows for each geoJson file
            let stop = stopsObjectGenerator.stopsObjectGenerator(geoJsonObjectInput, geoJsonFileIndex);
            let stopCsvRow = geoJsonObjectToCsv(stop, false);
            fileWriter(gtfsFolderRoute+stopsFileName, stopCsvRow);
            // Writing a routes.txt row for each geoJson file
            let route = routesObjectGenerator.routesObjectGenerator(geoJsonObjectInput, geoJsonFileIndex);
            let routeCsvRow = geoJsonObjectToCsv(route, false);
            fileWriter(gtfsFolderRoute+routesFileName, routeCsvRow);
            // Writing a trips.txt row for each geoJson file
            let trip = tripsObjectGenerator.tripsObjectGenerator(geoJsonObjectInput, generalSettings, geoJsonFileIndex);
            let tripCsvRow = geoJsonObjectToCsv(trip, false);
            fileWriter(gtfsFolderRoute+tripsFileName, tripCsvRow);
        }
        else {
            console.log(`${geoJsonObjectInput} is an invalid geoJson file !!!`);
        }
    }

    // TO DO: Generating stop_times.txt rows for each geoJson file
    // TO DO: Generating frequencies.txt for each geoJson file
}

main(getLocalSettings());
