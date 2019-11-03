const Find = require('find-key');
const colorprint = require('colorprint');

function findKeyInObject(obj, key) {
    return Find(obj, key);
}

module.exports = function objectFieldsFilter(obj, fields) {
    let values = [];
    try {
        fields.forEach(field => {        
            values.push(...findKeyInObject(obj, field));
        });
    }
    catch (error){
        colorprint.error("Error searching values in a object");
    }
    finally {
        return values;
    }
};
