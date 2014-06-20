!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.activityMocks=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict'

exports.strings = _dereq_('./mocks/strings.json');
exports.jsonld = _dereq_('./mocks/jsonld.json');
exports.spec = {
    basicWithDetail: _dereq_('./mocks/spec/basic-with-detail.json'),
    extended: _dereq_('./mocks/spec/extended.json'),
    minimal: _dereq_('./mocks/spec/minimal.json'),
};
exports.livefyre = {
    userPostMessage: _dereq_('./mocks/livefyre/user-post-message.json'),
    sitePostCollection: _dereq_('./mocks/livefyre/site-post-collection.json')
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

},{"./mocks/jsonld.json":2,"./mocks/livefyre/site-post-collection.json":3,"./mocks/livefyre/user-post-message.json":4,"./mocks/spec/basic-with-detail.json":5,"./mocks/spec/extended.json":6,"./mocks/spec/minimal.json":7,"./mocks/strings.json":8}],2:[function(_dereq_,module,exports){
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
    "actor": {
        "objectType": "site",
        "id": "urn:livefyre:livefyre.com:site=222",
        "url": "http://www.example.com"
    },
    "verb": "post",
    "object": {
        "id": "urn:livefyre:livefyre.com:site=286470:collection=824379",
        "objectType": "collection",
        "title": "Hello world!",
        "url": "http://www.demofyre.com/?p=1",
        "articleId": "1",
        "published" : "2014-06-14T20:56:16.046092Z",
        "site": {
            "displayName": "site.local",
            "id": "urn:livefyre:livefyre.com:site=286470",
            "objectType": "site",
            "url": "http://site.local/"
        },
        "tags": [{
            "id": "urn:livefyre:livefyre.com:site=286470:topic=123",
            "label": "Topic 123",
            "objectType": "topic"
        },{
            "id": "urn:livefyre:livefyre.com:topic=ABC",
            "label": "Topic ABC - Network",
            "objectType": "topic"
        }]
    },
    "cc": ["urn:livefyre:livefyre.com:site=286470:topic=123"]
}

},{}],4:[function(_dereq_,module,exports){
module.exports={
    "actor": {
        "id": "urn:livefyre:livefyre.com:user=%i",
        "objectType": "user",
        "displayName": "Bob Doe",
        "url": "http://www.livefyre.com/user/123",
        "image": "http://www.livefyre.com/user/123/sample.gif",
        "email": "bob@example.com"
    },
    "published" : "2014-06-14T20:56:16.046092Z",
    "verb": {
        "id": "urn:livefyre:livefyre.com:verb=post",
        "displayName": "post"
    },
    "object": {
        "id": "urn:livefyre:livefyre.com:collection=321:message=123",
        "objectType": "message",
        "content": "This is a comment post.",
        "ancestor": {
            "id": "urn:livefyre:livefyre.com:collection=321:message=111",
            "objectType": "message"
        },
        "inReplyTo": {
            "id": "urn:livefyre:livefyre.com:collection=321:message=112",
            "objectType": "message"
        }
    },
    "target": {
        "id": "urn:livefyre:livefyre.com:site=286470:collection=824379",
        "objectType": "collection",
        "title": "Hello world!",
        "url": "http://www.demofyre.com/?p=1",
        "articleId": "1",
        "site": {
            "displayName": "site.local",
            "id": "urn:livefyre:livefyre.com:site=286470",
            "objectType": "site",
            "url": "http://site.local/"
        },
        "tags": [{
            "id": "urn:livefyre:livefyre.com:site=286470:topic=123",
            "label": "Topic 123",
            "objectType": "topic"
        },{
            "id": "urn:livefyre:livefyre.com:topic=ABC",
            "label": "Topic ABC - Network",
            "objectType": "topic"
        }]
    },
    "cc": ["urn:livefyre:livefyre.com:topic=ABC"]
}

},{}],5:[function(_dereq_,module,exports){
module.exports={
  "verb": "post",
  "published": "2011-02-10T15:04:55Z",
  "language": "en",
  "actor": {
    "objectType": "person",
    "id": "urn:example:person:martin",
    "displayName": "Martin Smith",
    "url": "http://example.org/martin",
    "image": {
      "url": "http://example.org/martin/image.jpg",
      "mediaType": "image/jpeg",
      "width": 250,
      "height": 250
    }
  },
  "object" : {
    "objectType": "article",
    "id": "urn:example:blog:abc123/xyz",
    "url": "http://example.org/blog/2011/02/entry",
    "displayName": "Why I love Activity Streams"
  },
  "target" : {
    "objectType": "blog",
    "id": "urn:example:blog:abc123",
    "displayName": "Martin's Blog",
    "url": "http://example.org/blog/"
  }
}

},{}],6:[function(_dereq_,module,exports){
module.exports={
  "verb": "post",
  "language": "en",
  "published": "2011-02-10T15:04:55Z",
  "foo": "some extension property",
  "generator": "http://example.org/activities-app",
  "provider": "http://example.org/activity-stream",
  "displayName": {
    "en": "Martin posted a new video to his album.",
    "ga": "Martin phost le fisean nua a albam."
  },
  "actor": {
    "objectType": "person",
    "id": "urn:example:person:martin",
    "displayName": "Martin Smith",
    "url": "http://example.org/martin",
    "foo2": "some other extension property",
    "image": {
      "url": "http://example.org/martin/image",
      "mediaType": "image/jpeg",
      "width": 250,
      "height": 250
    }
  },
  "object" : {
    "objectType": {
      "id": "http://example.org/Photo",
      "displayName": "Photo"
    },
    "id": "urn:example:album:abc123/my_fluffy_cat",
    "url": "http://example.org/album/my_fluffy_cat.jpg",
    "image": {
      "url": "http://example.org/album/my_fluffy_cat_thumb.jpg",
      "mediaType": "image/jpeg",
      "width": 250,
      "height": 250
    }
  },
  "target": {
    "objectType": {
      "id": "http://example.org/PhotoAlbum",
      "displayName": "Photo-Album"
    },
    "id": "urn:example.org:album:abc123",
    "url": "http://example.org/album/",
    "displayName": {
      "en": "Martin's Photo Album",
      "ga": "Grianghraif Mairtin"
    },
    "image": {
      "url": "http://example.org/album/thumbnail.jpg",
      "mediaType": "image/jpeg",
      "width": 250,
      "height": 250
    }
  }
}

},{}],7:[function(_dereq_,module,exports){
module.exports={
   "verb": "post",
   "actor": "urn:example:person:martin",
   "object": "http://example.org/foo.jpg"
}

},{}],8:[function(_dereq_,module,exports){
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