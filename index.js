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
var notMocks = ['create', 'toArray'];

/**
 * Create a fresh instance of a named mock
 * @example .create('livefyre.userPostMessage')
 */
exports.create = function (name) {
    var blacklisted = (notMocks.indexOf(name) !== -1);
    var dotParts = name.split('.');
    var prototype = exports;
    dotParts.forEach(function (key) {
        prototype = prototype[key];
    });
    if (blacklisted || ! prototype) {
        throw new Error('Can\'t create activity-mock "'+name+'"');
    }
    return create(prototype);
};

// do it this way instead of Object.create, because JSON.stringify
// on an Object.created thing wont include keys from __proto__
function create(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Get an array of all the mocks
 */
exports.toArray = function () {
    return this.names.map(this.create);
};

exports.names = getNames(exports);

/**
 * Get an array of names from an object tree of mocks
 */
function getNames(mockTree, prefix) {
    prefix = prefix ? prefix + '.' : '';
    var names = Object.keys(mockTree)
        // filter notMocks
        .filter(function (key) {
            return notMocks.indexOf(key) === -1;
        })
        // map to the prefixed name
        // if the value for this key is another object of mocks, recurse
        .map(function (key) {
            var value = mockTree[key];
            // If it's an activity, just return the key
            if (value.verb) {
                return prefix + key;
            }
            return getNames(value, key);
        })
        // reduce to a flattened list of names
        .reduce(function (cur, next) {
            if ( ! (next instanceof Array)) {
                next = [next];
            }
            return cur.concat(next);
        }, []);
    return names;
}
