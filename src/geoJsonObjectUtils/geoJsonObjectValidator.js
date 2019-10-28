function geoJsonObjectValidator(geoJsonObject) {
    return geoJsonObject &&
        typeof geoJsonObject === 'object' &&
        geoJsonObject.constructor === Object &&
        geoJsonObject.hasOwnProperty("type") &&
        geoJsonObject.type === "FeatureCollection" &&
        geoJsonObject.hasOwnProperty("features") &&
        geoJsonObjectFeaturesFieldValidator(geoJsonObject.features);
}

function geoJsonObjectFeaturesFieldValidator(features) {
    return features &&
        typeof features === 'object' &&
        features.constructor === Array &&
        features.length > 0 &&
        geoJsonObjectFeatureValidator(features[0]);
}

function geoJsonObjectFeatureValidator(feature) {
    return feature &&
        typeof feature === 'object' &&
        feature.constructor === Object &&
        feature.hasOwnProperty("type") &&
        feature.type === "Feature" &&
        feature.hasOwnProperty("properties") &&
        geoJsonPropertiesFieldValidator(feature.properties) &&
        feature.hasOwnProperty("geometry") &&
        geoJsonGeometryValidator(feature.geometry);
}

function geoJsonPropertiesFieldValidator(properties) {
    return properties &&
        typeof properties === 'object' &&
        properties.constructor === Object &&
        (
            (
                properties.hasOwnProperty("agency") &&
                (typeof properties.agency === 'string' || properties.agency instanceof String) &&
                properties.agency.length > 0
            ) ||
            (
                properties.hasOwnProperty("agencia") &&
                (typeof properties.agencia === 'string' || properties.agencia instanceof String) &&
                properties.agencia.length > 0
            )
        ) 
}

function geoJsonGeometryValidator(geometry) {
    return geometry &&
        typeof geometry === 'object' &&
        geometry.constructor === Object &&
        geometry.hasOwnProperty("type") &&
        geometry.type === "LineString" &&
        geometry.hasOwnProperty("coordinates") &&
        geoJsonCoordinatesFieldValidator(geometry.coordinates);
    }
    
function geoJsonCoordinatesFieldValidator(coordinates) {
    return coordinates &&
        typeof coordinates === 'object' &&
        coordinates.constructor === Array &&
        coordinates.length > 0;
        // toDo: implement validation for each coordinate in the array
}

function coordinateValidator(coordinate){
    // toDo: implement this
    return true;
}

module.exports = function geJsonObjectValidator(geoJsonObject) {
    return geoJsonObjectValidator(geoJsonObject);
};
