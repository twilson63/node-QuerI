Connection = require('tedious').Connection
Request = require('tedious').Request

config = 
  userName: 'cpadmin'
  password: 'stars'
  server: '174.129.140.194'
  options:
    database: 'cph'

conn = new Connection(config)

conn.on 'connect', (err) ->
  request = new Request "select * from cppat", (err, rowCount) ->
    console.log rowCount

  request.on 'row', (columns) -> 
    for column in columns
      console.log column.value
    #console.dir columns

  conn.execSql request


