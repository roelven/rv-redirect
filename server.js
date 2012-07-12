var http        = require('http'),
    mysql       = require('mysql');

http.createServer(function(request, response) {
  var hostname    = require('url').parse('http://' + request.headers.host).hostname,
      connection  = mysql.createConnection(process.env.CLEARDB_DATABASE_URL),
      sql         = 'SELECT redirect_uri FROM domains WHERE host = ' + connection.escape(hostname);

  connection.connect();

  connection.query(sql, function(err, results) {
    if (err) {
      console.log(err);
      response.writeHead(302, {
        'X-Redirect-by': 'rv-redirect',
        'Location': 'http://roelvanderven.com/rv-redirect-error'
      });
      response.end();
    } else {
      if (!results[0]['redirect_uri']) {
        console.log('Domain unknown: ' + hostname + '. Sending home.');
        response.writeHead(302, {
          'X-Redirect-by': 'rv-redirect',
          'Location': 'http://roelvanderven.com/rv-redirect'
        });
        response.end();
      } else {
        console.log('Redirecting ' + hostname + ' to ' + results[0]['redirect_uri']);
        response.writeHead(302, {
          'X-Redirect-by': 'rv-redirect',
          'Location': 'http://' + results[0]['redirect_uri']
        });
        response.end();
      }
    };
  });

  connection.end();

}).listen(process.env.PORT || 8888);