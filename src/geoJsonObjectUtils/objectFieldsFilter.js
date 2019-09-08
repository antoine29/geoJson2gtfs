const Find = require('find-key');

function findKeyInObject(obj, key) {
    return Find(obj, key);
}

module.exports = function objectFieldsFilter(obj, fields) {
    let values = [];
    fields.forEach(field => {        
        values.push(...findKeyInObject(obj, field));
    });

    return values;
};
