var Connection, Request, cc, conn, connected, layout, nconf, tedious;

cc = require("coffeecup");

layout = require("" + __dirname + "/views/layout");

nconf = require('nconf');

tedious = require('tedious');

Connection = tedious.Connection;

Request = tedious.Request;

nconf.env().file({
  file: "" + __dirname + "/../config.json"
});

connected = false;

conn = new Connection(nconf.get('mssql'));

conn.on('connect', function(err) {
  connected = true;
  return console.log('connected...');
});

module.exports = function(router) {
  router.get('/', function() {
    this.res.writeHead(200, {
      'content-type': 'text/html'
    });
    return this.res.end(cc.render(layout));
  });
  return router.post('/', function() {
    var headers, request, results;
    var _this = this;
    if (connected) {
      results = [];
      headers = [];
      request = new Request(this.req.body.q, function(err, rowCount) {
        console.log(rowCount);
        _this.res.writeHead(200, {
          'content-type': 'text/html'
        });
        return _this.res.end(cc.render(layout, {
          headers: headers,
          results: results,
          q: _this.req.body.q
        }));
      });
      request.on('row', function(columns) {
        var column, row, _i, _j, _len, _len2;
        row = {};
        if (headers.length === 0) {
          for (_i = 0, _len = columns.length; _i < _len; _i++) {
            column = columns[_i];
            headers.push(column.metadata.colName);
          }
        }
        for (_j = 0, _len2 = columns.length; _j < _len2; _j++) {
          column = columns[_j];
          console.log(column.metadata.colName);
          row[column.metadata.colName] = column.value;
        }
        results.push(row);
        return console.log(row);
      });
      return conn.execSql(request);
    }
  });
};
