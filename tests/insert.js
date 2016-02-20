var _ = require('lodash');
var elastic = require('./../elastic');

var reports = [
    {
        "alarms" : 0,
        "events" : 281,
        "ipInterfaces" : 4,
        "monitoredServices" : 7,
        "nodes" : 1,
        "packageName" : "opennms",
        "snmpInterfaces" : 7,
        "systemId" : "0052ed00-2715-4e1d-a33d-e14e9084dac0",
        "version" : "17.0.1"
    },
    {
        "alarms" : 0,
        "events" : 281,
        "ipInterfaces" : 4,
        "monitoredServices" : 7,
        "nodes" : 2,
        "packageName" : "opennms",
        "snmpInterfaces" : 7,
        "systemId" : "0052ed00-2715-4e1d-a33d-e14e9084dac1",
        "version" : "17.1.0"
    }
];
_.each(reports, elastic.saveReport);
