
//
// Websocket Server
//

const WSS = require('ws').Server;
const wss = new WSS({ port: 8081 });

wss.on('connection', (socket) => {

  socket.send("server_handshake");
  console.log('Sent handshake to client.');

  socket.on('message', (message) => {
    console.log('Received: ' + message);
  });

  socket.on('close', () => {
    console.log('Closed Connection ');
  });

});


//
// Watch File Event
//

const chokidar = require('chokidar');

chokidar.watch('static', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
  broadcastFileChange()
});

function broadcastFileChange() {
  wss.clients.forEach((client) => {
    client.send('static_files_changed');
  });
}


//
// Serve Static Server
//

const express = require('express')
const app = express()

app.use(express.static('static'))
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})