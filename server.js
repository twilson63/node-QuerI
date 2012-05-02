var union = require('union'),
  director = require('director'),
  filed = require('filed'),
  connect = require('connect');

var router = new director.http.Router();

var server = union.createServer({
  before: [
    connect.favicon(),
    connect.logger('dev'),
    connect.basicAuth('jackhq', 'kinesis'),
    function (req, res) {
      var found = router.dispatch(req, res);
      if (!found) { 
        filed('./public' + req.url).pipe(res);
        //res.emit('next'); 
      }
    }
  ]
});

var app = require('./app')(router);

server.listen(3000);

