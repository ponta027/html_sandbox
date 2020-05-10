const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser')

require('date-utils');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
//    console.log(req.body);
      var dt = new Date();
      var formatted = dt.toFormat("YYYYMMDDHH24MISS");
      var dataFileName = formatted + ".mid";
    for (var i in req.body)
    {
        console.log(i)
        console.log(req.body[i])
        const decodedFile = new Buffer(req.body[i], 'base64');
        fs.appendFileSync("public/"+dataFileName, decode.slice(2));

    }
    res.json({result:true,file:dataFileName});
});

app.post('/analyzeQR', function (req, res) {
    console.log(req.body);
    const decodedFile = new Buffer(req.body[0], 'base64');
    res.json(
    { result:true,
      No: decodeFile[0],
      totalNo: decodeFile[1]
    }
    );
});
app.use((req, res) => {
  res.sendStatus(404);
});

server.listen(2020);

