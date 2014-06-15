!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.activityMocks=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict'

exports.strings = _dereq_('./mocks/strings.json');
exports.jsonld = _dereq_('./mocks/jsonld.json');

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

},{"./mocks/jsonld.json":2,"./mocks/strings.json":3}],2:[function(_dereq_,module,exports){
module.exports={
  "@context": "https://w3id.org/activity-streams/v2",
  "actor": {
    "objectType": "person",
    "displayName": "Joe"
  },
  "verb": "post",
  "object": {
    "id": "http://example.org/cars/for-sale#tesla",
    "objectType": "http://purl.org/goodrelations/v1#",
    "displayName": "Used Tesla Roadster",
    "content": "Need to sell fast and furiously",
    "gr:hasBusinessFunction": "gr:Sell",
    "gr:acceptedPaymentMethods": "gr:Cash",
    "gr:hasPriceSpecification": {
      "gr:hasCurrencyValue": "85000",
      "gr:hasCurrency": "USD"
    },
    "gr:includes": {
      "@type": [
        "gr:Individual",
        "pto:Vehicle"
      ],
      "gr:name": "Tesla Roadster",
      "foaf:page": "http://www.teslamotors.com/roadster"
    },
    "@context": {
      "gr": "http://purl.org/goodrelations/v1#",
      "pto": "http://www.productontology.org/id/",
      "foaf": "http://xmlns.com/foaf/0.1/",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "foaf:page": {
        "@type": "@id"
      },
      "gr:acceptedPaymentMethods": {
        "@type": "@id"
      },
      "gr:hasBusinessFunction": {
        "@type": "@id"
      },
      "gr:hasCurrencyValue": {
        "@type": "xsd:float"
      },      
      "displayName": "gr:name",
      "content": "gr:description",
      "objectType": "@type"
    }
  }
}

},{}],3:[function(_dereq_,module,exports){
module.exports={
  "@context": "https://w3id.org/activity-streams/v2",
  "verb": "post",
  "actor": "acct:joe@example.org",
  "object": "http://example.org/posts/1",
  "updated": "2014-12-12T12:12:12.123Z"
}

},{}]},{},[1])
(1)
});