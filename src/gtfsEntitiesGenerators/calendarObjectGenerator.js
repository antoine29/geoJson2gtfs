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

function getCalendarServiceId(setting) {
    if (setting.serviceId) return setting.serviceId;
    throw "Every setting in calendarSettings field should have a serviceId field";
}

function getCalendarStartDate(setting) {
    if (setting.startDate) return setting.startDate;
    throw "Every setting in calendarSettings field should have a startDate field";
}

function getCalendarEndDate(setting) {
    if (setting.endDate) return setting.endDate;
    throw "Every setting in calendarSettings field should have a endDate field";
}

function getCalendarServiceDay(setting, day) {
    if (
        setting.serviceDays &&
        typeof setting.serviceDays === 'object' &&
        setting.serviceDays.constructor === Array &&
        setting.serviceDays.length === 7
    ) {
        return setting.serviceDays[day];
    }
    throw "Every setting in calendarSettings field should have a serviceDays field";
}

exports.calendarObjectGenerator = function(settings) {

    let calendarValues = [];
    settings.calendarSettings.forEach(calendarSetting => {
        calendarValues.push({
            serviceId: getCalendarServiceId(calendarSetting),
            startDate: getCalendarStartDate(calendarSetting),
            endDate: getCalendarEndDate(calendarSetting),
            monday: getCalendarServiceDay(calendarSetting, 0),
            tuesday: getCalendarServiceDay(calendarSetting, 1),
            wednesday: getCalendarServiceDay(calendarSetting, 2),
            thursday: getCalendarServiceDay(calendarSetting, 3),
            friday: getCalendarServiceDay(calendarSetting, 4),
            saturday: getCalendarServiceDay(calendarSetting, 5),
            sunday: getCalendarServiceDay(calendarSetting, 6),
        });
    });

    return {
        fields: gtfsAgencyFileFields(),
        values: calendarValues
    }
}

exports.calendarObjectFields = function() {
    return {
        fields: gtfsAgencyFileFields(),
        values: []
    };
}
