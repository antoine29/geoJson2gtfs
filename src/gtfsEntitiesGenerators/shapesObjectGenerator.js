function gtfsShapesFileFields() {
    return [
        {
            
            value: 'shapeId',
            label: 'shape_id'
        },
        {
            
            value: 'shapePtLat',
            label: 'shape_pt_lat'
        },
        {
            
            value: 'shapePtLon',
            label: 'shape_pt_lon'
        },
        {
            
            value: 'shapePtSequence',
            label: 'shape_pt_sequence'
        }
    ];
}

function getStopLat(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[1];
}

function getStopLong(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[0];
}

exports.shapesObjectGenerator = function(agency, geoJsonObject) {
    let shapes = [];
    let lat, long;
    for (let i=0; i<geoJsonObject.features[0].geometry.coordinates.length; i++) {
        shapes.push({
            shapeId: `${agency.values[0].agencyId}SH`,
            shapePtLat: getStopLat(geoJsonObject, i),
            shapePtLon: getStopLong(geoJsonObject, i),
            shapePtSequence: i + 1,
        });
    }
    
    return {
        fields: gtfsShapesFileFields(),
        values: shapes
    };
};

exports.shapesObjectFields = function() {
    return {
        fields: gtfsShapesFileFields(),
        values: []
    };
};
