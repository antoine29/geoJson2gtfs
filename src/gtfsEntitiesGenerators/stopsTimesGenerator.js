function gtfsStopTimesFileFields() {
    return [
        {
            value: 'tripId',
            label: 'trip_id'
        },
        {
            value: 'stopId',
            label: 'stop_id'
        },
        {
            value: 'stopSequence',
            label: 'stop_sequence'
        },
        {
            value: 'arrivalTime',
            label: 'arrival_time'
        },
        {
            value: 'departureTime',
            label: 'departure_time'
        },
        {
            value: 'shapeDistTraveled',
            label: 'shape_dist_traveled'
        },
        {
            value: 'timepoint',
            label: 'timepoint'
        }
    ];
}

exports.stopTimesObjectGenerator = function(trip, stops) {
    let stopTimes = [];
    for (let i=0; i<stops.length; i++) {
        stopTimes.push({
            tripId: trip.tripId,
            stopId: stops[i].stopId,
            stopSequence: i,
            arrivalTime: null,
            departureTime: null,
            shapeDistTraveled: null,
            timepoit: null
        });
    }
    
    return {
        fields: gtfsStopTimesFileFields(),
        values: stopTimes
    };
};

exports.stopTimesObjectFields = function() {
    return {
        fields: gtfsStopTimesFileFields(),
        values: []
    };
};
