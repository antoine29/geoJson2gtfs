const geoJsonFileReader = require('./src/geoJsonFileReader');

function geoJson2GTFS(geoJsonFileName) {
    
    const input = typeof geoJson === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    


}
