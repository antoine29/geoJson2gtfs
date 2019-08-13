const geoJsonFileReader = require('./src/geoJsonFileReader');

function geoJson2GTFS(geoJsonFileName) {
    console.log("this is the index");

    const input = typeof geoJson === "string" ?
        geoJsonFileReader(geoJsonFileName) : geoJsonFileName;
    
    


}
