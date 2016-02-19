#!/bin/sh
curl "http://localhost:9200/usage-stats/_search?pretty=true&q=*:*"
