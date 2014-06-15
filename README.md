# activity-mocks

Mock [JSON Activity Streams](http://tools.ietf.org/html/draft-snell-activitystreams-09) Objects you can use to develop other components.

## Mocks

From [jasnell/activitystreams.jsonld](https://github.com/jasnell/activitystreams.jsonld) README.

* [strings](./mocks/strings.json) - Has only string values for Activity properties
* [jsonld](./mocks/jsonld.json) - The 'extended example' whose .object has its own jsonld context

## `make` commands

* `make build` - will `npm install` and `bower install`
* `make dist` - will use r.js optimizer to compile the source, UMD wrap, and place that and source maps in dist/
* `make clean`
* `make server` - serve the repo over http
* `make deploy [env={*prod,uat,qa}]` - Deploy to lfcdn, optionally specifying a bucket env
