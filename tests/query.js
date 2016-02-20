var _ = require('lodash');
var restify = require('restify');
var client = restify.createJsonClient({ url: 'http://localhost:9200' });
//
//// Retrieve the total number of managed nodes from all systems
//client.post('/log/system/_search?search_type=count', {
//    "query": {
//        "range": {
//            "@timestamp": {
//                "gte": 1 // TODO: Calculate (now-1d)
//            }
//        }
//    },
//    "aggs" : {
//        "nodes" : {
//            "sum" : {
//                "field" : "nodes"
//            }
//        }
//    }
//}, function(err, req, res, obj) {
//    console.log('%d -> %j', res.statusCode, res.headers);
//    console.log('%s', JSON.stringify(obj, null, 2));
//});

//// Group systems by version
//client.post('/log/system/_search?search_type=count', {
//    "query": {
//        "range": {
//            "@timestamp": {
//                "gte": 1 // TODO: Calculate (now-1d)
//            }
//        }
//    },
//    "aggs" : {
//        "versions" : {
//            "terms" : {
//                "field" : "version"
//            }
//        }
//    }
//}, function(err, req, res, obj) {
//    console.log('%d -> %j', res.statusCode, res.headers);
//    console.log('%s', JSON.stringify(obj, null, 2));
//});

// Retrieve the total number of systems
client.post('/log/system/_search?search_type=count', {
}, function(err, req, res, obj) {
    console.log('%d -> %j', res.statusCode, res.headers);
    console.log('%s', JSON.stringify(obj, null, 2));
});

