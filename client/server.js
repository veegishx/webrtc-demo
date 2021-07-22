const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const os = require('os');
const express = require('express');
const ifaces = os.networkInterfaces();
const serverUtils = require('./utils/serverUtils');

const PRIVATE_KEY = fs.readFileSync('../certs/key.pem' , 'utf8');
const CERT = fs.readFileSync('../certs/cert.pem' , 'utf8');
const LAN_INTERFACE = "0.0.0.0";
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const credentials = {
  key: PRIVATE_KEY,
  cert: CERT
}

const ports = {
  http: HTTP_PORT,
  https: HTTPS_PORT
}

const server = express();

const httpServer = http.createServer(server);
const httpsServer = https.createServer(credentials, server);

httpServer.listen(HTTP_PORT, LAN_INTERFACE);
httpsServer.listen(HTTPS_PORT, LAN_INTERFACE);

serverUtils.startupMessage(ifaces, ports);

server.get('/', (request, result) => {
  result.sendFile(path.join(__dirname + '/index.html'));
});

server.use('/resources', express.static('./src'));
