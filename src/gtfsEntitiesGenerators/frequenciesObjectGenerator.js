function gtfsFrequenciesFileFields() {
    return [
        {
            value: 'tripId',
            label: 'trip_id'
        },
        {
            value: 'startTime',
            label: 'start_time'
        },
        {
            value: 'endTime',
            label: 'end_time'
        },
        {
            value: 'exactTimes',
            label: 'exact_times'
        },
        {
            value: 'headwaySecs',
            label: 'headway_secs'
        }
    ];
}

exports.frequenciesObjectGenerator = function(trip, settings) {
    return {
        fields: gtfsFrequenciesFileFields(),
        values: [
            {
                tripId: trip.tripId,
                startTime: settings.frequencies[0].startTime,
                endTime: settings.frequencies[0].endTime,
                exactTimes: settings.frequencies[0].exactTimes,
                headwaySecs: settings.frequencies[0].headwaySecs
            }
        ]
    };
}

exports.frequenciesObjectFields = function() {
    return {
        fields: gtfsFrequenciesFileFields(),
        values: []
    };
}
