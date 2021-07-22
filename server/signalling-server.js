const fs = require('fs');
const PeerServer = require('peer').PeerServer;


const SignallingServer = PeerServer({
  port: 9000,
    path: '/peerjs',
    ssl: {
        key: fs.readFileSync('./../certs/key.pem', 'utf8'),
        cert: fs.readFileSync('./../certs/cert.pem', 'utf8')
    }
});

SignallingServer.on('connection', (client) => { 
  console.log(`Client connected [ID: ${JSON.stringify(client.id)}]`);  
});

SignallingServer.on('disconnect', (client) => {
  console.log(`Client disconnected [ID: ${JSON.stringify(client.id)}]`);
});