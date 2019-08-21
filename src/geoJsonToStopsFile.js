class Stop {
    constructor(idStop, lat, long, streetName) {
        this.idStop = idStop;
        this.lat = lat;
        this.long = long;
        this.streetName = streetName;
    }
}

function getStopsFileFields() {
    return [
        {
            value: 'idStop',
            label: 'id'
        },
        {
            value: 'lat',
            label: 'lattitude'
        },
        {
            value: 'long',
            label: 'longitude'
        },
        {
            value: 'streetName',
            label: 'name'
        }
    ];
}

module.exports = function geoJsonToStopsFile(geoJsonObject) {
    let stops = [];
    let stop;

    geoJsonObject.features[0].geometry.coordinates.forEach((coord, i) => {
        let id = i;
        let streetName = 'thisIsAName';
        stop = new Stop(id, coord[0], coord[1], streetName);
        stops.push(stop);
    });

    return {
        fields: getStopsFileFields(),
        stops: stops
    };
};