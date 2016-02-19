var _ = require('lodash');
var restify = require('restify');
var client = restify.createJsonClient({ url: 'http://localhost:9200' });

console.log('Starting Elasticsearch Logger');

client.put('/_template/usage-stats', {
  "template" : "usage-stats",
  "settings" : { "number_of_shards" : 1, "number_of_replicas": 0 },
  "mappings" : {
    "report" : {
      "_source" : {"enabled" : true },

      "properties": {
        "@timestamp": {type: 'date', "format": "epoch_millis" },
        "systemId": {type: 'string', index: 'not_analyzed'}
      },

      "dynamic_templates": [
        {
          "strings": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "string",
              "index" : "not_analyzed",
              "omit_norms" : true,
            }
          }
        }
      ]
    }
  }
}, function(err) {
  if (err) {
    console.log('Template mapping res:', err);
  }
});

function saveReport(report) {

  var metrics = {};
  metrics["@timestamp"] = new Date().getTime();

  for (var property in report) {
    if (report.hasOwnProperty(property)) {
      metrics[property] = report[property];
    }
  }


  client.post('/usage-stats/report', metrics, function(err) {
    if (err) {
      console.log('Report write error', err);
    } else {
      console.log('Succesfully wrote report', metrics);
    }
  });
}

module.exports = {
  saveReport: saveReport
};
