var program = require('commander');
var graphite = require('graphite');
var pkg = require('./package.json');
var _ = require('lodash');
var elastic = require('./elastic');

var restify = require('restify');
var server = restify.createServer({name: 'opennms-statsusage'});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

server.post('/opennms-usage-report', function (req, res, next) {
  var report = req.body;

  console.log('report received: ', report);
  elastic.saveReport(report);

  res.send({message: 'ok'});
});

server.use(function(err, req, res, next) {
  if (err) {
    console.error("Error!", err.toString());
    console.error(err.stack);
    res.status(500).send('Error!');
  }
});

server.listen(3542, function () {
  console.log('%s listening at %s', server.name, server.url);
});
