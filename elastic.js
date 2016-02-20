var _ = require('lodash');
var restify = require('restify');
var client = restify.createJsonClient({ url: 'http://localhost:9200' });

console.log('Starting Elasticsearch Logger');

client.put('/log_v1', {
  "settings" : { "number_of_shards" : 1, "number_of_replicas": 0 },
  "mappings" : {
    "usage" : {
      "_all" : {"enabled": false},
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
              "omit_norms" : true
            }
          }
        }
      ]
    },
    "system" : {
      "_all" : {"enabled": false},
      "_source" : {"enabled" : true },

      "properties": {
        "@timestamp": {type: 'date', "format": "epoch_millis" }
      },

      "dynamic_templates": [
        {
          "strings": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "string",
              "index" : "not_analyzed",
              "omit_norms" : true
            }
          }
        }
      ]
    }
  }
}, function(err) {
  if (err) {
    console.log('Index creation failed', err);
  } else {
    client.post('/_aliases', {
      "actions": [
        {"add": {"index": "log_v1", "alias": "log"}}
      ]
    }, function(err) {
      if (err) {
        console.log('Alias creation failed', err);
      }
    });
  }
});

function saveReport(report) {

  // Include the current timestamp
  report['@timestamp'] = new Date().getTime();

  client.post('/log/usage', report, function(err) {
    if (err) {
      console.log('Failed to save report to usage log', err);
    } else {
      console.log('Successfully saved report to usage log', report);
    }
  });

  if (report.systemId) {
    var systemId = report.systemId;
    delete report.systemId;
    client.put('/log/system/' + systemId, report, function(err) {
      if (err) {
        console.log('Failed to save report system log', err);
      } else {
        console.log('Successfully save report to system log', report);
      }
    });
  }
}

module.exports = {
  saveReport: saveReport
};
