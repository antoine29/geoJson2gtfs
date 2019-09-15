const fg = require('fast-glob');
 
module.exports = function filesSearcher(pattern) {
    const entries = fg.sync([pattern], { dot: false, onlyFiles: true});
    return entries;
}
