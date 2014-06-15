'use strict'

exports.strings = require('./mocks/strings.json');
exports.jsonld = require('./mocks/jsonld.json');
exports.livefyre = require('./mocks/livefyre.json');

var createBlacklist = ['create'];

/**
 * Create a fresh instance of a named mock
 */
exports.create = function (name) {
    var blacklisted = (createBlacklist.indexOf(name) !== -1);
    var prototype = exports[name];
    var missing = ! (exports[name]);
    if (blacklisted || ! prototype) {
        throw new Error('Can\'t create activity-mock "'+name+'"')
    }
    return Object.create(prototype);
}
