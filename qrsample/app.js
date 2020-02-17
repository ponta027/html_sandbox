const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

var https = require('https');
var fs = require('fs');

var ssl_server_key = 'server_key.pem';
var ssl_server_crt = 'server_crt.pem';

var options = {
        key: fs.readFileSync(ssl_server_key),
        cert: fs.readFileSync(ssl_server_crt)
};
var server = https.createServer(options,app);

app.post('/sample', function (req, res) {
    console.log(req.body);
    res.writeHead(200);
    res.end("Hello World.");
});

app.use((req, res) => {
  res.sendStatus(404);
});

server.listen(2020);

