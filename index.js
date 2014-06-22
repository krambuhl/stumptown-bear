var http = require("http");

http.createServer(function(req, res) {
  res.writeHead(301, {
    "location": "./dist/"
  });
  res.end();
}).listen(80, "127.0.0.1");
