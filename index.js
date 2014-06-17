'use strict'

exports.strings = require('./mocks/strings.json');
exports.jsonld = require('./mocks/jsonld.json');
exports.spec = {
    basicWithDetail: require('./mocks/spec/basic-with-detail.json'),
    extended: require('./mocks/spec/extended.json'),
    minimal: require('./mocks/spec/minimal.json'),
};
exports.livefyre = {
    userPostMessage: require('./mocks/livefyre/user-post-message'),
    sitePostCollection: require('./mocks/livefyre/site-post-collection')
};

// Blacklist certain names to .create(name)
var createBlacklist = ['create'];

/**
 * Create a fresh instance of a named mock
 * @example .create('livefyre.userPostMessage')
 */
exports.create = function (name) {
    var blacklisted = (createBlacklist.indexOf(name) !== -1);
    var dotParts = name.split('.');
    var prototype = exports;
    dotParts.forEach(function (key) {
        prototype = prototype[key];
    });
    if (blacklisted || ! prototype) {
        throw new Error('Can\'t create activity-mock "'+name+'"')
    }
    return Object.create(prototype);
}
