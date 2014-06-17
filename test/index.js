"use strict";

var activityMocks = require('activity-mocks');
var assert = require('chai').assert;
var sinon = require('sinon');

var mockList = [
    'jsonld',
    'strings',
    'livefyre.sitePostCollection',
    'livefyre.userPostMessage'
];

describe('activity-mocks', function () {
    it('has good mocks', function () {
        mockList.forEach(function (name) {
            assert.typeOf(activityMocks.create(name), 'object');
        });
    });
    it('.names is an Array of all the mock names', function () {
        assert.equal(activityMocks.names.length, 7)
    });
    describe('.toArray()', function () {
        it('converts mock tree to array', function () {
            var mocks = activityMocks.toArray();
            assert.instanceOf(mocks, Array);
            assert.equal(mocks.length, 7);
        });
    });
    describe('.create', function () {
        it('creates separate instances of the same mock', function () {
            var a1 = activityMocks.create('strings');
            var a2 = activityMocks.create('strings');
            assert.equal(a1.verb, a2.verb);
            a2.verb = 'asplodes';
            assert.notEqual(a1.verb, a2.verb);
        });
    });
});
