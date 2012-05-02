cc = require "coffeecup"
layout = require "#{__dirname}/views/layout"
nconf = require 'nconf'
tedious = require 'tedious'
Connection = tedious.Connection
Request = tedious.Request

nconf.env().file({ file: "#{__dirname}/../config.json"})

connected = false
conn = new Connection(nconf.get('mssql'))
conn.on 'connect', (err) -> 
  connected = true
  console.log('connected...')

module.exports = (router) ->
  router.get '/', ->
    @res.writeHead 200, 'content-type': 'text/html'
    @res.end(cc.render layout)
  
  router.post '/', ->
    if connected
      results = []
      headers = []
      request = new Request @req.body.q, (err, rowCount) =>
        console.log rowCount
        @res.writeHead 200, 'content-type': 'text/html'
        @res.end(cc.render layout, headers: headers, results: results, q: @req.body.q)

      request.on 'row', (columns) -> 
        row = {}
        if headers.length == 0
          headers.push column.metadata.colName for column in columns
        for column in columns
           console.log column.metadata.colName
           row[column.metadata.colName] = column.value
        results.push row
        console.log row

      conn.execSql request
    