const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const https = require('https');

const ssl_server_key = 'server_key.pem';
const ssl_server_crt = 'server_crt.pem';

const options = {
        key: fs.readFileSync(ssl_server_key),
        cert: fs.readFileSync(ssl_server_crt)
};
const server = https.createServer(options,app);

app.use((req, res) => {
  res.sendStatus(404);
});

server.listen( port );

console.log( port )
