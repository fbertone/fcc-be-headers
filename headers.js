var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  var software = "";
  try { // well I guess that's not extremely universal but should do the job
    software = (req.headers["user-agent"]).split('(')[1].split(')')[0];
  } catch (e) {  };

  var languege = "";
  try { // just in case...
    // the reference implementation returns just the first language
    language = (req.headers["accept-language"]).split(',')[0];
  } catch (e) {  };

  var data = { // check if proxed
    ipaddress : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language : language,
    software : software
  };
  
  res.end(JSON.stringify(data), 'utf-8');
});

server.listen((process.env.PORT || 5000), function(){
    console.log("Request Header Parser Microservice listening on port: %s",
    (process.env.PORT || 5000));
});
