class Stop {
    constructor(idStop, lat, long, streetName) {
        this.idStop = idStop;
        this.lat = lat;
        this.long = long;
        this.streetName = streetName;
    }
}

module.exports = function geoJsonToStopsFile(geoJsonObject) {

    let stops = [];
    let stop;

    geoJsonObject.features.geometry.coordinates.forEach(coord => {
        let id = 'id';
        let streetName = 'thisIsAName';
        stop = new Stop(id, coord[0], coord[1], streetName);
        stops.push(stop);
    });

    return stops;
};