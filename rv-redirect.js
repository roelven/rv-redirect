var http        = require('http'),
    mysql       = require('mysql');

http.createServer(function(request, response) {
  var hostname    = require('url').parse('http://' + request.headers.host).hostname.replace('www.', ''),
      connection  = mysql.createConnection(process.env.CLEARDB_DATABASE_URL),
      sql         = 'SELECT redirect_uri FROM domains WHERE host = ' + connection.escape(hostname);

  connection.connect();

  function redirect_to(domain) {
    if (domain) {
      return domain[0]['redirect_uri'];
    } else {
      throw new Error('Unknown domain.');
    }
  }

  connection.query(sql, function(err, results) {
    try {
      console.log('Redirecting [' + hostname + '] to [' + redirect_to(results) + ']');
      response.writeHead(301, {
        'Location': 'http://' + redirect_to(results)
      });
      response.end();
    } catch (e) {
      // surpressing e here since we want to redirect in all error cases
      console.log('Unknown domain: [' + hostname + '], sending home.');
      response.writeHead(301, {
        'Location': 'http://roelvanderven.com/rv-redirect-error'
      });
      response.end();
    }
  });

  connection.end();

}).listen(process.env.PORT || 5000);