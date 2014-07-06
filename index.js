var http = require("http");

http.createServer(function(req, res) {
  res.writeHead(301, {
    "location": "./proto/dist/"
  });
  res.end();
}).listen(80, "localhost");
