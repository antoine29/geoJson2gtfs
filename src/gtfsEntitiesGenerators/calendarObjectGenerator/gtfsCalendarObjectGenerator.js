function gtfsAgencyFileFields() {
    return [
        {
            value: 'serviceId',
            label: 'service_id'
        },
        {
            value: 'startDate',
            label: 'start_date'
        },
        {
            value: 'endDate',
            label: 'end_date'
        },
        {
            value: 'monday',
            label: 'monday'
        },
        {
            value: 'tuesday',
            label: 'tuesday'
        },
        {
            value: 'wednesday',
            label: 'wednesday'
        },
        {
            value: 'thursday',
            label: 'thursday'
        },
        {
            value: 'friday',
            label: 'friday'
        },
        {
            value: 'saturday',
            label: 'saturday'
        },
        {
            value: 'sunday',
            label: 'sunday'
        }
    ];
}

function getCalendarServiceId(settings) {
    if (settings.calendarSettings.serviceId) return settings.calendarSettings.serviceId;
    throw "The settings file must have a calendarSettings.serviceId field";
}

function getCalendarStartDate(settings) {
    if (settings.calendarSettings.startDate) return settings.calendarSettings.startDate;
    throw "The settings file must have a calendarSettings.startDate field";
}

function getCalendarEndDate(settings) {
    if (settings.calendarSettings.endDate) return settings.calendarSettings.endDate;
    throw "The settings file must have a calendarSettings.endDate field";
}

function getCalendarServiceDay(settings, day) {
    if (
        settings.calendarSettings.serviceDays &&
        typeof settings.calendarSettings.serviceDays === 'object' &&
        settings.calendarSettings.serviceDays.constructor === Array &&
        settings.calendarSettings.serviceDays.length === 7
    ) {
        return settings.calendarSettings.serviceDays[day];
    }
    throw "The settings file must have a valid calendarSettings.serviceDays field";
}



module.exports = function gtfsCalendarObjectGenerator(settings) {
    return {
        fields: gtfsAgencyFileFields(),
        values: [
            {
                serviceId: getCalendarServiceId(settings),
                startDate: getCalendarStartDate(settings),
                endDate: getCalendarEndDate(settings),
                monday: getCalendarServiceDay(settings, 0),
                tuesday: getCalendarServiceDay(settings, 1),
                wednesday: getCalendarServiceDay(settings, 2),
                thursday: getCalendarServiceDay(settings, 3),
                friday: getCalendarServiceDay(settings, 4),
                saturday: getCalendarServiceDay(settings, 5),
                sunday: getCalendarServiceDay(settings, 6),
            }
        ]
    };
}