const geoJsonFileUtils = require('./fileHandlers/geoJsonFileUtils');
const streamFileWriter = require('./fileHandlers/streamFileWriter');
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
const stopTimesObjectGenerator = require('./gtfsEntitiesGenerators/stopsTimesGenerator');
const frequenciesObjectGenerator = require('./gtfsEntitiesGenerators/frequenciesObjectGenerator');

module.exports = async function geoJson2gtfs(settings, geoJsonFilesFolder) {
    let gtfsFolderRoute = './gtfs/';
    let calendarFileName = 'calendar.txt';
    let agencyFileName = 'agency.txt';
    let stopsFileName = 'stops.txt';
    let routesFileName = 'routes.txt';
    let tripsFileName = 'trips.txt';
    let stopTimesFileName = 'stop_times.txt';
    let frequenciesFileName = 'frequencies.txt';
    
    // filling the missing addresses in geoJson files
    console.log("Starting to get complete the geoJson files");
    await geoJsonFilesFiller(geoJsonFilesFolder);

    console.log("Starting to write the gtfs files");
    fse.initializeEmptyFolder(gtfsFolderRoute);
    // These rows only have to be writen once time at the begining of the program
    // Writing calendar.txt file and its headers
    let calendarObjectFields = calendarObjectGenerator.calendarObjectFields();
    let gtfsCalendarHeadersRow = geoJsonObjectToCsv(calendarObjectFields, true);
    streamFileWriter(gtfsFolderRoute+calendarFileName, gtfsCalendarHeadersRow);
    // Writing agency.txt file and its headers
    let agencyObjectFields = agencyObjectGenerator.agencyObjectFields();
    let gtfsAgencyHeadersRow = geoJsonObjectToCsv(agencyObjectFields, true);
    streamFileWriter(gtfsFolderRoute+agencyFileName, gtfsAgencyHeadersRow);
    // Writing stops.txt file and its headers
    let stopsObjectFields = stopsObjectGenerator.stopsObjectFields();
    let gtfsStopsHeadersRow = geoJsonObjectToCsv(stopsObjectFields, true);
    streamFileWriter(gtfsFolderRoute+stopsFileName, gtfsStopsHeadersRow);
    // Writing routes.txt file and its headers
    let routesObjectFields = routesObjectGenerator.routesObjectFields();
    let gtfsRoutesHeadersRow = geoJsonObjectToCsv(routesObjectFields, true);
    streamFileWriter(gtfsFolderRoute+routesFileName, gtfsRoutesHeadersRow);
    // Writing trips.txt file and its headers
    let tripsObjectFields = tripsObjectGenerator.tripsObjectFields();
    let gtfsTripsHeadersRow = geoJsonObjectToCsv(tripsObjectFields, true);
    streamFileWriter(gtfsFolderRoute+tripsFileName, gtfsTripsHeadersRow);
    // Writing stop_times.txt file and its headers
    let stopTimesObjectFields = stopTimesObjectGenerator.stopTimesObjectFields();
    let gtfsStopTimesHeadersRow = geoJsonObjectToCsv(stopTimesObjectFields, true);
    streamFileWriter(gtfsFolderRoute+stopTimesFileName, gtfsStopTimesHeadersRow);
    // Writing frequencies.txt file and its headers
    let frequenciesObjectFields = frequenciesObjectGenerator.frequenciesObjectFields();
    let frequenciesHeadersRow = geoJsonObjectToCsv(frequenciesObjectFields, true);
    streamFileWriter(gtfsFolderRoute+frequenciesFileName, frequenciesHeadersRow);
    
    // Writing the calendar.txt rows
    let calendarObjectValues = calendarObjectGenerator.calendarObjectGenerator(settings);
    let gtfsCalendarRows = geoJsonObjectToCsv(calendarObjectValues, false);
    streamFileWriter(gtfsFolderRoute+calendarFileName, gtfsCalendarRows);
    
    // Getting all geojson files in directory
    let geoJsonFiles = filesSearcher(geoJsonFilesFolder, 'geojson');

    for (let geoJsonFileIndex = 0; geoJsonFileIndex < geoJsonFiles.length; geoJsonFileIndex++) {
        
        let geoJsonFilePath = geoJsonFiles[geoJsonFileIndex];
        
        const geoJsonObjectInput = typeof geoJsonFilePath === "string" ?
            geoJsonFileUtils.geoJsonFileReader(geoJsonFilePath) : geoJsonFilePath;

        if (geoJsonObjectValidator(geoJsonObjectInput)) {
            // Writing an agency.txt row for each geoJson file
            let agency = agencyObjectGenerator.agencyObjectGenerator(geoJsonObjectInput, settings, geoJsonFileIndex);
            let agencyCsvRow = geoJsonObjectToCsv(agency, false);
            streamFileWriter(gtfsFolderRoute+agencyFileName, agencyCsvRow);
            // Writing stop.txt rows for each geoJson file
            let stops = stopsObjectGenerator.stopsObjectGenerator(geoJsonObjectInput, geoJsonFileIndex);
            let stopCsvRows = geoJsonObjectToCsv(stops, false);
            streamFileWriter(gtfsFolderRoute+stopsFileName, stopCsvRows);
            // Writing a routes.txt row for each geoJson file
            let route = routesObjectGenerator.routesObjectGenerator(geoJsonObjectInput, geoJsonFileIndex);
            let routeCsvRow = geoJsonObjectToCsv(route, false);
            streamFileWriter(gtfsFolderRoute+routesFileName, routeCsvRow);
            // Writing a trips.txt row for each geoJson file
            let trip = tripsObjectGenerator.tripsObjectGenerator(geoJsonObjectInput, settings, geoJsonFileIndex);
            let tripCsvRow = geoJsonObjectToCsv(trip, false);
            streamFileWriter(gtfsFolderRoute+tripsFileName, tripCsvRow);
            // Writing stop_times.txt rows for each geoJson file
            let stopTimes = stopTimesObjectGenerator.stopTimesObjectGenerator(trip.values[0], stops.values);
            let stopTimesCsvRows = geoJsonObjectToCsv(stopTimes, false);
            streamFileWriter(gtfsFolderRoute+stopTimesFileName, stopTimesCsvRows);
            // Writing a frequencies.txt row for each geoJson file
            let frequencie = frequenciesObjectGenerator.frequenciesObjectGenerator(trip.values[0], settings);
            let frequencieCsvRow = geoJsonObjectToCsv(frequencie, false);
            streamFileWriter(gtfsFolderRoute+frequenciesFileName, frequencieCsvRow);
        }
        else {
            console.log(`${geoJsonObjectInput} is an invalid geoJson file !!!`);
        }
    }
}
