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

    stopTimes.push({
        tripId: trip.tripId,
        stopId: stops[0].stopId,
        stopSequence: i,
        departureTime: '00:00:00',
        arrivalTime: '00:00:00',
        shapeDistTraveled: null,
        timepoit: null
    });

    for (let i=1; i<stops.length-1; i++) {
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

    stopTimes.push({
        tripId: trip.tripId,
        stopId: stops[stops.length-1].stopId,
        stopSequence: i,
        departureTime: '01:00:00',
        arrivalTime: '01:00:00',
        shapeDistTraveled: null,
        timepoit: null
    });
    
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
